// If the user does not exist on the request, throw a 401 error
export default defineEventHandler((event) => {
  if (!event.context.userDetails) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
});
