export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  // Get the published dataset
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

  return (
    (datasetMetadata.dataset_structure_description as DatasetStructureDescription) ||
    {}
  );
});
