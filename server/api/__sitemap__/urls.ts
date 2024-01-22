import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async () => {
  const mongodbClient = await mongodbClientPromise;

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const dbDatasets = await db
    .collection("dataset")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  if (!dbDatasets) {
    console.log("No datasets found");
    return [];
  }

  return dbDatasets.map((dataset: DatabaseDatasetRecord) => {
    return {
      _sitemap: "pages",
      loc: `/datasets/${dataset.identifier}`,
    };
  });
});
