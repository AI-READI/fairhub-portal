import dayjs from "dayjs";
import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const mongodbClient = await mongodbClientPromise;

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const dbDataset: DatabaseDatasetRecord = await db
    .collection("dataset")
    .findOne({
      identifier: Number(datasetid),
    });

  if (!dbDataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const creators: DatasetCreators = dbDataset.creators;

  let creatorsCitationText = "";

  for (let i = 0; i < creators.length; i++) {
    const creator = creators[i];

    creatorsCitationText += `${creator.givenName} ${creator.familyName}`;

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
  }). Fairhub.`;

  const doiCitationText = `https://doi.org/${dbDataset.doi}`;
  const fullCitationText = `${splitCitationText} ${doiCitationText}`;

  return {
    doi: doiCitationText,
    full: fullCitationText,
    split: splitCitationText,
  };
});
