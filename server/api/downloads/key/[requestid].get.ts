export default defineEventHandler(async (event) => {
  protectRoute(event);

  const downloadRequest = event.context.params?.requestid;
  const userDetails = event.context.userDetails;

  const request = await prisma.download_request.findUnique({
    select: {
      download_key: true,
    },
    where: {
      id: downloadRequest,
      status: "READY",
      user_details_id: userDetails.id,
    },
  });

  if (!request) {
    console.log(`Dataset ${downloadRequest} not found`);

    throw createError({
      message: `Dataset ${downloadRequest} not found`,
      statusCode: 404,
    });
  }

  const keyData = request.download_key as string;
  const decodedKey = atob(keyData);
  const keyBuffer = Buffer.from(decodedKey);

  if (keyData) {
    setResponseHeader(event, "content-type", "text/plain");
    return keyBuffer;
  } else {
    return createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }
});
