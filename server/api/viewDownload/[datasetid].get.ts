export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  const dataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!dataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const datasetId = dataset.dataset_id;

  // get all datasets with the same dataset_id
  // This is the same as all versions of the same dataset in fairhub study management

  const requestAproval = await prisma.download_request_approval.findUnique({
    select: {
      approval_status: true,
    },
    where: {
      id: datasetId,
    },
  });

  return requestAproval.approval_status;
});
