export default defineEventHandler(async (event) => {
  protectRoute(event);

  const userDetails = event.context.userDetails;
  const datasetId = event.context.params?.datasetid;

  if (!datasetId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Dataset ID parameter is required",
    });
  }

  const selectProps = {
    id: true,
    attestation_accepted: true,
    dataset_id: true,
    license_accepted: true,
    research_purpose: true,
    user_details_id: true,
  };

  const existingAgreement = await prisma.download_agreement.findFirst({
    select: selectProps,
    where: {
      dataset_id: datasetId,
      user_details_id: userDetails.id,
    },
  });

  if (existingAgreement) {
    return existingAgreement;
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "Dataset agreement not found",
    });
  }
});
