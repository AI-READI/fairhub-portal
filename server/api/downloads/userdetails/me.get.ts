import protectRoute from "~/server/utils/protectRoute";

/**
 * Gets the user details for the current user.
 */
export default defineEventHandler(async (event) => {
  protectRoute(event);

  const userDetails = event.context.userDetails;
  const user = await prisma.download_user_details.findUnique({
    select: {
      id: true,
      affiliation: true,
      email: true,
      family_name: true,
      given_name: true,
      organization: true,
      phone: true,
    },
    where: {
      id: userDetails.id,
    },
  });

  if (user) {
    return user;
  } else {
    return createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }
});
