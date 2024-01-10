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

  // reorder dataset with id '5748d180-86ea-4538-8ad4-55e211035e34' to the top

  const index = datasets.findIndex(
    (dataset) => dataset.id === "5748d180-86ea-4538-8ad4-55e211035e34"
  );

  if (index > -1) {
    const dataset = datasets.splice(index, 1)[0];
    datasets.unshift(dataset);
  }

  return datasets;
});
