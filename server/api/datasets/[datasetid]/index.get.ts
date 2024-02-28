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

  const dataset: Dataset = {
    id: dbDataset.identifier,
    title: dbDataset.title,
    createdAt: dbDataset.createdAt,
    creators: dbDataset.creators,
    description: dbDataset.description,
    files: dbDataset?.files,
    keywords: dbDataset.keywords,
    metadata: {
      datasetDescription: dbDataset.metadata.dataset_description,
      dataSheet: dbDataset.metadata.data_sheet,
      datatypeDictionary: dbDataset.metadata.datatype_dictionary,
      readme: dbDataset.metadata.readme,
      studyDescription: dbDataset.metadata.study_description,
    },
    studyTitle: dbDataset.fairhub.study.title,
    updatedOn: dbDataset.updatedOn,
  };

  return dataset;
});
