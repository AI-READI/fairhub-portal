export default defineEventHandler(async (_event) => {
  const publishedDatasets = await prisma.published_dataset.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  if (!publishedDatasets) {
    console.log("No datasets found");
    return [];
  }

  const datasets: DatasetArray = [];

  for (const dataset of publishedDatasets) {
    const datasetId = Number(dataset.id).toString();

    const datasetCreatedAt: bigint = BigInt(dataset.created_at);

    const datasetMetadata = dataset.published_metadata as any;
    const datasetFiles = dataset.files as any;
    const datasetAdditionalData = dataset.data as any;

    const item: Dataset = {
      id: datasetId,
      title: dataset.title,
      created_at: Number(datasetCreatedAt),
      data: datasetAdditionalData,
      dataset_id: dataset.dataset_id,
      description: dataset.description,
      doi: dataset.doi,
      files: datasetFiles,
      metadata: {
        datasetDescription: datasetMetadata.dataset_description,
        datasetStructureDescription:
          datasetMetadata.dataset_structure_description,
        healthsheet: datasetMetadata.healthsheet,
        readme: datasetMetadata.readme,
        studyDescription: datasetMetadata.study_description,
      },
      study_id: dataset.study_id,
      study_title: dataset.study_title,
      version_id: dataset.version_id,
      version_title: dataset.version_title,
    };

    datasets.push(item);
  }

  return datasets;
});
