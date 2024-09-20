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

  const request = await prisma.download_request.findMany({
    select: {
      approval_id: true,
    },
    where: {
      dataset_id: datasetid,
    },
  });
  const approvalId = request.map((m) => m.approval_id);

  const requestAccess = await prisma.download_request_approval.findMany({
    select: {
      approval_status: true,
    },
    where: {
      id: {
        in: approvalId,
      },
    },
  });
  const approvedRequests = requestAccess.filter(
    (record) => record.approval_status.toUpperCase() === "APPROVED",
  );
  return approvedRequests.length;
});
