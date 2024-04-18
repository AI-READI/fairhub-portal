import { v4 as uuid } from "uuid";

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const userDetails = event.context.userDetails;
  const postBody = await readBody(event);

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
      dataset_id: postBody.dataset_id,
      user_details_id: userDetails.id,
    },
  });

  if (existingAgreement) {
    return existingAgreement;
  }

  try {
    const timestamp = currentUnixTimestamp();
    const agreement = await prisma.download_agreement.create({
      data: {
        id: uuid(),
        attestation_accepted: postBody.attestation_accepted,
        created_at: timestamp,
        dataset_id: postBody.dataset_id,
        license_accepted: postBody.license_accepted,
        research_purpose: postBody.research_purpose,
        updated_on: timestamp,
        user_details_id: userDetails.id,
      },
      select: selectProps,
    });

    return agreement;
  } catch (error) {
    throw createError({
      statusCode: 422,
      statusMessage: "Download agreement could not be created",
    });
  }
});
