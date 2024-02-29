import * as path from "node:path";
import * as fs from "node:fs";
import dayjs from "dayjs";
import Cite from "citation-js";
import mongodbClientPromise from "~/server/utils/mongodb";

const additionalFormats = [
  {
    file: "chicago.csl",
    format: "chicago",
  },
  {
    file: "ieee.csl",
    format: "ieee",
  },
  {
    file: "mla.csl",
    format: "mla",
  },
];

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const { format } = getQuery(event);

  const mongodbClient = await mongodbClientPromise;

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const dbDataset = await db.collection("dataset").findOne({
    identifier: Number(datasetid),
  });

  if (!dbDataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const datasetDescription = dbDataset.metadata.dataset_description;
  const creators = datasetDescription.creator;

  let creatorsCitationText = "";

  for (let i = 0; i < creators.length; i++) {
    const creator = creators[i];

    const splitCreatorName = creator.creatorName.split(",");

    if (splitCreatorName.length === 2) {
      creatorsCitationText += `${splitCreatorName[1]} ${splitCreatorName[0]}`;
    } else {
      creatorsCitationText += creator.creatorName;
    }

    if (i === creators.length - 2) {
      creatorsCitationText += " & ";
    } else if (i < creators.length - 2) {
      creatorsCitationText += ", ";
    }
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const splitCitationText = `${creatorsCitationText}. (${dayjs
    .unix(dbDataset.createdAt)
    .format("YYYY")}). ${dbDataset.title} (${
    dbDataset.fairhub.version.title
  }). FAIRhub.`;

  const doiCitationText = `https://doi.org/${dbDataset.doi}`;
  const fullCitationText = `${splitCitationText} ${doiCitationText}`;

  for (const { file, format } of additionalFormats) {
    const csl = fs.readFileSync(
      path.join(process.cwd(), "public", "formats", file),
      "utf8",
    );

    const config = Cite.plugins.config.get("@csl");
    config.templates.add(format, csl);
  }

  const cite = new Cite("10.5281/zenodo.10642459");

  const requestedCitationFormatText: string = cite.format("bibliography", {
    template: format,
  });

  return {
    doi: doiCitationText,
    formattedText: requestedCitationFormatText,
    full: fullCitationText,
    split: splitCitationText,
  };
});
