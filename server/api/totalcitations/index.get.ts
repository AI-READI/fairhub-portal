export default defineEventHandler(async (_event) => {
  const { datasetid } = _event.context.params as { datasetid: string };

  const publishedDatasets = await prisma.published_dataset.findMany({
    orderBy: { created_at: "desc" },
    where: {
      id: datasetid,
    },
  });

  const totalCitations = publishedDatasets.reduce((total, dataset) => {
    const data = dataset.data as { cited: number };
    return total + (data.cited || 0);
  }, 0);

  return totalCitations;
});
