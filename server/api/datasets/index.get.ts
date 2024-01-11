import mongodbClientPromise from "~/server/utils/mongodb";

export default defineEventHandler(async (_event) => {
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

  const datasets: DatasetArray = [];

  for (const dataset of dbDatasets) {
    const item = {
      id: dataset.identifier,
      title: dataset.title,
      createdAt: dataset.created_at,
      description: dataset.description,
      updatedOn: dataset.updated_on,
    };

    datasets.push(item);
  }

  return datasets;
});
