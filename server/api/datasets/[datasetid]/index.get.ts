export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const publishedDataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!publishedDataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const additionalData = publishedDataset.data as any;

  // Add 1 to the viewCount
  additionalData.viewCount = (additionalData.viewCount || 0) + 1;

  await prisma.published_dataset.update({
    data: {
      data: additionalData,
    },
    where: {
      id: datasetid,
    },
  });

  const datasetId = Number(publishedDataset.id).toString();

  const datasetCreatedAt: bigint = BigInt(publishedDataset.created_at);

  // const datasetMetadata = JSON.parse(
  //   publishedDataset.published_metadata as string,
  // );
  const datasetMetadata = publishedDataset.published_metadata as any;

  console.log(typeof datasetMetadata.dataset_description);

  console.log("datasetMetadata");
  console.log(datasetMetadata.dataset_description);

  const datasetFiles = publishedDataset.files as any;

  const datasetAdditionalData = additionalData;

  const dataset: Dataset = {
    id: datasetId,
    title: publishedDataset.title,
    created_at: Number(datasetCreatedAt),
    data: datasetAdditionalData,
    dataset_id: publishedDataset.dataset_id,
    description: publishedDataset.description,
    doi: publishedDataset.doi,
    files: datasetFiles,
    metadata: {
      datasetDescription: datasetMetadata.dataset_description,
      datasetStructureDescription:
        datasetMetadata.dataset_structure_description,
      healthsheet: datasetMetadata.healthsheet,
      readme: datasetMetadata.readme,
      studyDescription: datasetMetadata.study_description,
    },
    study_id: publishedDataset.study_id,
    study_title: publishedDataset.study_title,
    version_id: publishedDataset.version_id,
    version_title: publishedDataset.version_title,
  };

  return dataset;
});
