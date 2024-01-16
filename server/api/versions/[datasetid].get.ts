import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const mongodbClient = await mongodbClientPromise;

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const dataset = await db.collection("dataset").findOne({
    identifier: Number(datasetid),
  });

  if (!dataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const { fairhubDatasetId } = dataset;

  // get all datasets with the same fairhubDatasetId
  // This is the same as all versions of the same dataset in fairhub
  const relatedDatasets = await db
    .collection("dataset")
    .find({
      fairhubDatasetId,
    })
    .toArray();

  const versions: VersionArray = relatedDatasets.map(
    (relatedDataset: DatabaseDatasetRecord) => {
      return {
        id: relatedDataset.identifier,
        title: relatedDataset.version.title,
        createdAt: relatedDataset.createdAt,
        doi: relatedDataset.doi,
      };
    }
  );

  // sort versions by createdAt
  versions.sort((a: any, b: any) => {
    return b.createdAt - a.createdAt;
  });

  return versions;
});
