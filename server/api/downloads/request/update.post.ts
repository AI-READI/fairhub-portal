export default defineEventHandler(async (_event) => {
  protectRoute(_event);
  const userDetails = _event.context.userDetails;
  const postBody = await readBody(_event);

  // TODO: validate token - move validation logic to common location
  // TODO: validate request - read request and confirm ownership and validity

  try {
    const timestamp = currentUnixTimestamp();

    const downloadRequest = await prisma.download_request.update({
      data: {
        download_uri: postBody.downloadUri,
        updated_on: timestamp,
      },
      select: {
        id: true,
      },
      where: {
        id: postBody.request,
        user_details_id: userDetails.id,
      },
    });
    return downloadRequest;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 422,
      statusMessage: "Download request URI could not be updated",
    });
  }
});
