export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const dataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!dataset) {
    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const publishedDatasets = await prisma.published_dataset.findMany({
    orderBy: { created_at: "desc" },
    where: {
      dataset_id: dataset.dataset_id,
    },
  });

  const totalCitations = publishedDatasets.reduce((total, dataset) => {
    const data = dataset.data as { cited: number };
    return total + (data.cited || 0);
  }, 0);

  return totalCitations || 0;
});
