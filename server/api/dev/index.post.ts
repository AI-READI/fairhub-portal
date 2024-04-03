import DatasetRecord from "../../../dev/datasetRecord.json";

export default defineEventHandler(async (_event) => {
  console.log("event", DatasetRecord);

  const firstRecord = await prisma.published_dataset.findUnique({
    where: {
      id: "1",
    },
  });

  if (!firstRecord) {
    console.log("No record found, exiting function");
    return;
  }

  const updatedRecord = await prisma.published_dataset.update({
    data: {
      title: DatasetRecord.title,
      data: DatasetRecord.data,
      dataset_id: DatasetRecord.dataset_id,
      description: DatasetRecord.description,
      doi: DatasetRecord.doi,
      files: DatasetRecord.files,
      published_metadata: DatasetRecord.published_metadata,
      study_id: DatasetRecord.study_id,
      study_title: DatasetRecord.study_title,
      version_id: DatasetRecord.version_id,
      version_title: DatasetRecord.version_title,
    },
    where: {
      id: "1",
    },
  });

  console.log("Updated record", updatedRecord);

  return {
    message: "Updated record",
    statusCode: 200,
  };
});
