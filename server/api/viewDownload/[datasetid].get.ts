async function sendLog(message: string) {
  await fetch(
    `https://logwatch.aireadi.org/api/log/cm1bg6iw70004yk6cqx5v0oyq`,
    {
      body: new URLSearchParams({
        level: "debug",
        message,
      }),
      method: "POST",
    },
  );
}

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

  await sendLog(`Dataset ${datasetid} requested`);

  const request = await prisma.download_request.findMany({
    select: {
      approval_id: true,
    },
    where: {
      dataset_id: datasetid,
    },
  });
  const approvalIds = request.map((m) => m.approval_id);

  const requestAccess = await prisma.download_request_approval.findMany({
    select: {
      approval_status: true,
    },
    where: {
      id: {
        in: approvalIds,
      },
    },
  });
  const approvedRequests = requestAccess.filter(
    (record) => record.approval_status.toUpperCase() === "APPROVED",
  );
  return approvedRequests.length;
});
