import MactelDatasetRecord from "../../../dev/mactelDatasetRecord.json";

export default defineEventHandler(async (_event) => {
  // console.log("event", DatasetRecord);

  const record = await prisma.published_dataset.findUnique({
    where: {
      id: "6",
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
      title: MactelDatasetRecord.title,
      data: MactelDatasetRecord.data,
      dataset_id: MactelDatasetRecord.dataset_id,
      description: MactelDatasetRecord.description,
      doi: MactelDatasetRecord.doi,
      files: MactelDatasetRecord.files,
      published_metadata: MactelDatasetRecord.published_metadata,
      study_id: MactelDatasetRecord.study_id,
      study_title: MactelDatasetRecord.study_title,
      version_id: MactelDatasetRecord.version_id,
      version_title: MactelDatasetRecord.version_title,
    },
    where: {
      id: "6",
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
