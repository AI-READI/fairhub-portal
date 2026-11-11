import DatasetRecord from "../../../dev/datasetRecord.json";

export default defineEventHandler(async (_event) => {
  // console.log("event", DatasetRecord);

  const record = await prisma.published_dataset.findUnique({
    where: {
      id: "5",
    },
  });

  if (!record) {
    console.log("No record found, exiting function");
    throw createError({
      statusCode: 500,
      statusMessage: "No record found",
    });
  }

  // throw createError({
  //   statusCode: 500,
  //   statusMessage: "This function is disabled",
  // });
  //
  // /**
  //  * ! disabling the update operation
  //  */

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
      id: "5",
    },
  });

  if (!updatedRecord) {
    console.log("No record updated, exiting function");
    throw createError({
      statusCode: 500,
      statusMessage: "No record updated",
    });
  }

  // console.log("Updated record", updatedRecord);

  return {
    message: "Updated record",
    statusCode: 200,
  };
});
