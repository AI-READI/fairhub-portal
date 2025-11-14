export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const config = useRuntimeConfig();
  const currentTime = Math.round(Date.now() / 1000);
  const studyReleaseTimestamp = Number(config.public.STUDY_RELEASE_TIMESTAMP);

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

  const datasetFiles = publishedDataset.files as any;

  const datasetAdditionalData = additionalData;

  const fairhubDatasetId = publishedDataset.dataset_id;

  // get all datasets with the same dataset_id
  // This is the same as all versions of the same dataset in fairhub study management
  const relatedDatasets = await prisma.published_dataset.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      dataset_id: fairhubDatasetId,
    },
  });

  let versions: VersionArray = relatedDatasets.map((relatedDataset) => {
    return {
      id: Number(relatedDataset.id).toString(),
      title: relatedDataset.version_title,
      createdAt: Number(BigInt(relatedDataset.created_at)),
      doi: relatedDataset.doi,
    };
  });

  if (currentTime < studyReleaseTimestamp) {
    versions = versions.filter(
      (version) => version.id === "2" || version.id === "1",
    );
  } else {
    versions = versions.filter(
      (version) => version.id === "3" || version.id === "4",
    );
  }

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
    versions,
  };

  return dataset;
});
