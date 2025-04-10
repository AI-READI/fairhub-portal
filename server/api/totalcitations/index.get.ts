export default defineEventHandler(async (_event) => {
  const publishedDatasets = await prisma.published_dataset.findMany({
    distinct: ["dataset_id"],
    orderBy: { created_at: "desc" },
  });
  console.log(publishedDatasets, "kkkkkkkkkkkkkkkkkk");
  const totalCitations = publishedDatasets.reduce((sum, dataset) => {
    return sum + (dataset?.data?.cite || 0);
  }, 0);

  return { totalCitations };
});