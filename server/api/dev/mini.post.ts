import MiniDatasetRecord from "../../../dev/miniDatasetRecord.json";

export default defineEventHandler(async (_event) => {
  // console.log("event", DatasetRecord);

  const miniRecord = await prisma.published_dataset.findUnique({
    where: {
      id: "4",
    },
  });

  if (!miniRecord) {
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
      title: MiniDatasetRecord.title,
      data: MiniDatasetRecord.data,
      dataset_id: MiniDatasetRecord.dataset_id,
      description: MiniDatasetRecord.description,
      doi: MiniDatasetRecord.doi,
      files: MiniDatasetRecord.files,
      published_metadata: MiniDatasetRecord.published_metadata,
      study_id: MiniDatasetRecord.study_id,
      study_title: MiniDatasetRecord.study_title,
      version_id: MiniDatasetRecord.version_id,
      version_title: MiniDatasetRecord.version_title,
    },
    where: {
      id: "4",
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
