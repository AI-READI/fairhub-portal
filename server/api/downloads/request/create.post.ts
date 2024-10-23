import { v4 as uuid } from "uuid";

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const userDetails = event.context.userDetails;
  const postBody = await readBody(event);

  const selectProps = {
    id: true,
    dataset_id: true,
    download_agreement_id: true,
    folders_selected: true,
    status: true,
    user_details_id: true,
  };

  const licenseAgreement = await prisma.download_agreement.findUnique({
    where: {
      id: postBody.download_agreement_id,
    },
  });

  if (
    !licenseAgreement ||
    licenseAgreement.dataset_id.trim() !== postBody.dataset_id.trim() ||
    licenseAgreement.user_details_id !== userDetails.id
  ) {
    console.error(
      "License agreement not found, or it doesn't match the dataset and user",
    );
    throw createError({
      statusCode: 422,
      statusMessage: "Download request could not be created",
    });
  }

  // Require DAC approval for non-diabetes research
  const approvalStatus = licenseAgreement.is_diabetes_research
    ? "APPROVED"
    : "AWAITING_APPROVAL";
  const approvalReason = licenseAgreement.is_diabetes_research
    ? "No approval needed for diabetes research"
    : null;

  try {
    const timestamp = currentUnixTimestamp();
    const approvalId = uuid();
    const [_approval, downloadRequest] = await prisma.$transaction([
      prisma.download_request_approval.create({
        data: {
          id: approvalId,
          approval_status: approvalStatus,
          created_at: timestamp,
          status_notes: approvalReason,
          updated_on: timestamp,
        },
      }),
      prisma.download_request.create({
        data: {
          id: uuid(),
          approval_id: approvalId,
          created_at: timestamp,
          dataset_id: postBody.dataset_id,
          download_agreement_id: licenseAgreement.id,
          folders_selected: postBody.folders_selected,
          status: "PENDING",
          updated_on: timestamp,
          user_details_id: userDetails.id,
        },
        select: selectProps,
      }),
    ]);

    return downloadRequest;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 422,
      statusMessage: "Download request could not be created",
    });
  }
});
