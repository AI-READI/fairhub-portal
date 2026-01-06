export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const dataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!dataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const doi = dataset.doi;

  if (!doi) {
    return {
      downloads: 0,
      source: "datacite",
      views: 0,
    };
  }

  const res = await fetch(
    `https://api.datacite.org/metrics?doi=${encodeURIComponent(
      `https://doi.org/${doi}`,
    )}`,
    { method: "GET" },
  );

  if (!res.ok) {
    throw createError({
      message: "DataCite metrics fetch failed",
      statusCode: 502,
    });
  }

  const data = await res.json();

  return {
    doi,
    downloads: data?.data?.downloads ?? 0,
    source: "datacite",
    views: data?.data?.views ?? 0,
  };
});
