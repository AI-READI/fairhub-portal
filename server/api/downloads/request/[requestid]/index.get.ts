export default defineEventHandler(async (event) => {
  protectRoute(event);

  const downloadRequest = event.context.params?.requestid;
  const userDetails = event.context.userDetails;

  const request = await prisma.download_request.findUnique({
    select: {
      id: true,
      dataset_id: true,
      download_agreement_id: true,
      download_key: true,
      download_uri: true,
      expires_at: true,
      status: true,
      user_details_id: true,
    },
    where: {
      id: downloadRequest,
      user_details_id: userDetails.id,
    },
  });

  if (request) {
    return {
      id: request.id,
      dataset_id: request.dataset_id,
      download_agreement_id: request.download_agreement_id,
      download_key: request.download_key,
      download_uri: request.download_uri,
      expires_at: request.expires_at
        ? Number(BigInt(request.expires_at))
        : null,
      status: request.status,
      user_details_id: request.user_details_id,
    };
  } else {
    return createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }
});
