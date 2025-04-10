export default defineEventHandler(async (_event) => {
  const publishedDatasets = await prisma.published_dataset.findMany({
    orderBy: { created_at: "desc" },
  });

  const totalCitations = publishedDatasets.reduce((total, dataset) => {
    const data = dataset.data as { cited: number };
    return total + (data.cited || 0);
  }, 0);

  return totalCitations;
});
