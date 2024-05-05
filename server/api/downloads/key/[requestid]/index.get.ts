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

  const data = request.download_key as string;

  const userKey = userDetails.email.replace(/[^a-zA-Z0-9]/g, "");

  const byteString = atob(data);
  const file = new File([byteString], `${userKey}.key`);

  if (file) {
    return file;
  } else {
    return createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }
});
