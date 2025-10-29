export default defineEventHandler(async (_event) => {
  const publishedDatasets = await prisma.published_dataset.findMany({
    distinct: ["dataset_id"],
    orderBy: [{ dataset_id: "desc" }, { created_at: "desc" }],
  });

  if (!publishedDatasets) {
    console.log("No datasets found");
    return [];
  }
  const bytesToReadable = (b: number) => {
    const n = Number(b);
    if (isNaN(n)) return "0 B";
    const tb = n / 1e12;
    const gb = n / 1e9;
    return tb >= 1 ? `${tb.toFixed(2)} TB` : `${gb.toFixed(2)} GB`;
  };

  const datasets: DatasetArray = [];

  for (const dataset of publishedDatasets) {
    const datasetId = Number(dataset.id).toString();
    const datasetAdditionalData = {
      ...(dataset.data as any),
      size: bytesToReadable((dataset.data as any)?.size),
    };
    const datasetCreatedAt: bigint = BigInt(dataset.created_at);

    const datasetMetadata = dataset.published_metadata as any;
    const datasetFiles = dataset.files as any;

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
      versions: [],
    };

    datasets.push(item);
  }

  return datasets;
});
