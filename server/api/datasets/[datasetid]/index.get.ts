export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const dbDataset = await prisma.dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!dbDataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const createdAt = Number(dbDataset.created_at);
  const updatedOn = Number(dbDataset.updated_on);

  const dbTitle = await prisma.dataset_title.findFirst({
    where: {
      dataset_id: datasetid,
      type: "MainTitle",
    },
  });

  const title = dbTitle?.title ?? "";

  const dbDescription = await prisma.dataset_description.findFirst({
    where: {
      dataset_id: datasetid,
      type: "Abstract",
    },
  });

  const description = dbDescription?.description ?? "";

  const dbCreators = await prisma.dataset_contributor.findMany({
    where: {
      creator: true,
      dataset_id: datasetid,
    },
  });

  const creators = dbCreators.map((dbCreator) => dbCreator.name);

  const dataset: Dataset = {
    id: dbDataset.id,
    title,
    createdAt,
    creators,
    description,
    updatedOn,
  };

  return dataset;
});
