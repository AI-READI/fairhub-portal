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
      status: true,
      user_details_id: true,
    },
    where: {
      id: downloadRequest,
      user_details_id: userDetails.id,
    },
  });

  if (request) {
    return request;
  } else {
    return createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }
});
