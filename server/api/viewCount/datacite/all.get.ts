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

  const allVersions = await prisma.published_dataset.findMany({
    where: {
      dataset_id: dataset?.dataset_id,
    },
  });

  let total = 0;

  for (const version of allVersions) {
    const doi = version.doi;

    if (!doi) continue;

    const res = await fetch(
      `https://api.datacite.org/metrics?doi=${encodeURIComponent(
        `https://doi.org/${doi}`,
      )}`,
      {
        method: "GET",
      },
    );

    if (res.ok) {
      const data = await res.json();

      total += data?.data?.views ?? 0; // same accumulation pattern as Umami
    } else {
      console.error("DataCite error");
    }
  }

  return total;
});
