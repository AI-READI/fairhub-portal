export default defineEventHandler(async (_event) => {
  const dbDatasets = await prisma.dataset.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  if (!dbDatasets) {
    console.log("No datasets found");
    return [];
  }

  const datasets: DatasetArray = [];

  for (const dataset of dbDatasets) {
    const { id } = dataset;

    console.log("dataset", dataset);

    const createdAt = Number(dataset.created_at);
    const updatedOn = Number(dataset.updated_on);

    const dbTitle = await prisma.dataset_title.findFirst({
      where: {
        dataset_id: id,
        type: "MainTitle",
      },
    });

    const title = dbTitle?.title ?? "";

    const dbDescription = await prisma.dataset_description.findFirst({
      where: {
        dataset_id: id,
        type: "Abstract",
      },
    });

    const description = dbDescription?.description ?? "";

    const item = {
      id: dataset.id,
      title,
      createdAt,
      description,
      updatedOn,
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
