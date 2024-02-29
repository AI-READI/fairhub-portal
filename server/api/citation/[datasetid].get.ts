import dayjs from "dayjs";
import Cite from "citation-js";
import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

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

  const json = new Cite("10.5281/zenodo.1005176");

  return {
    doi: doiCitationText,
    full: fullCitationText,
    json,
    split: splitCitationText,
  };
});
