export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const publishedDataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });
  if (!publishedDataset) {
    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }
  const datasetMetadata = publishedDataset.published_metadata as any;

  const datasetDescriptionJson: DatasetDescription =
    datasetMetadata.study_description;

  setHeader(event, "Content-Type", "application/json; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=300, s-maxage=600");

  return datasetDescriptionJson;
});
