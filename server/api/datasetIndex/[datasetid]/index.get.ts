export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const publishedDataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!publishedDataset?.doi) {
    throw createError({
      message: `Dataset ${datasetid} not found or has no DOI`,
      statusCode: 404,
    });
  }

  const doi = encodeURIComponent(publishedDataset.doi);
  const url = `https://beta.scholardata.io/api/v1/datasets/by-doi?doi=${doi}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw createError({
      message: `Scholardata API error: ${response.statusText}`,
      statusCode: response.status,
    });
  }

  return response.json();
});
