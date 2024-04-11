/**
 * Saves user details to the database.
 */
export default defineEventHandler(async (event) => {
  protectRoute(event);

  const sessionUserDetails = event.context.userDetails;
  const selectProps = {
    id: true,
    affiliation: true,
    email: true,
    family_name: true,
    given_name: true,
    organization: true,
    phone: true,
  };
  const existingUser = await prisma.download_user_details.findUnique({
    select: selectProps,
    where: { id: sessionUserDetails.id },
  });

  if (existingUser) {
    return existingUser;
  }

  try {
    const timestamp = currentUnixTimestamp();
    const userDetails = await prisma.download_user_details.create({
      data: {
        id: sessionUserDetails.id,
        created_at: timestamp,
        email: sessionUserDetails.email,
        family_name: sessionUserDetails.family_name,
        given_name: sessionUserDetails.given_name,
        updated_on: timestamp,
      },
      select: selectProps,
    });

    return userDetails;
  } catch (error) {
    throw createError({
      statusCode: 422,
      statusMessage: "User details could not be created",
    });
  }
});
