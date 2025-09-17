import { v4 as uuid } from "uuid";

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const userDetails = event.context.userDetails;
  const postBody = await readBody(event);

  const selectProps = {
    id: true,
    ai_use: true,
    attestation_accepted: true,
    collaborator_data_access: true,
    data_handling_plan: true,
    dataset_id: true,
    is_diabetes_research: true,
    license_accepted: true,
    research_project_title: true,
    research_purpose: true,
    signing_official_address: true,
    signing_official_email: true,
    signing_official_first_name: true,
    signing_official_institution: true,
    signing_official_last_name: true,
    signing_official_phone_number: true,
    signing_official_title: true,
    study_background: true,
    study_design: true,
    study_overview: true,
    user_details_id: true,
  };

  try {
    const timestamp = currentUnixTimestamp();
    const agreement = await prisma.download_agreement.create({
      data: {
        id: uuid(),
        ai_use: postBody.ai_use,
        attestation_accepted: postBody.attestation_accepted,
        collaborator_data_access: postBody.collaborator_data_access,
        created_at: timestamp,
        data_handling_plan: postBody.data_handling_plan,
        dataset_id: postBody.dataset_id,
        is_diabetes_research: postBody.is_diabetes_research,
        license_accepted: postBody.license_accepted,
        research_project_title: postBody.research_project_title,
        research_purpose: postBody.research_purpose,
        signing_official_address: postBody.signing_official_address,
        signing_official_email: postBody.signing_official_email,
        signing_official_first_name: postBody.signing_official_first_name,
        signing_official_institution: postBody.signing_official_institution,
        signing_official_last_name: postBody.signing_official_last_name,
        signing_official_phone_number: postBody.signing_official_phone_number,
        signing_official_title: postBody.signing_official_title,
        study_background: postBody.study_background,
        study_design: postBody.study_design,
        study_overview: postBody.study_overview,
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
