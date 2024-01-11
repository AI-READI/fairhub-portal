import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const mongodbClient = await mongodbClientPromise;

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const dbDataset = await db.collection("dataset").findOne({
    identifier: Number(datasetid),
  });

  console.log("dbDataset", dbDataset);

  if (!dbDataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const dataset: Dataset = {
    id: dbDataset.identifier,
    title: dbDataset.title,
    createdAt: dbDataset.created_at,
    creators: [],
    description: dbDataset.description,
    metadata: {
      readme: dbDataset.metadata.readme,
      studyDescription: dbDataset.metadata.study_description,
    },
    updatedOn: dbDataset.updated_on,
  };

  return dataset;
});
