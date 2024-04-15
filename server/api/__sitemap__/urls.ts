export default defineEventHandler(async () => {
  const datasets = await prisma.published_dataset.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  if (!datasets) {
    console.log("No datasets found");
    return [];
  }

  return datasets.map((dataset) => {
    const datasetId = Number(dataset.id).toString();

    return {
      _sitemap: "pages",
      loc: `/datasets/${datasetId}`,
    };
  });
});
