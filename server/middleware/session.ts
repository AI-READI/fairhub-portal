/**
 * Adds user details from the session to the request context.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await useSession(event, {
    password: config.sessionPassword,
  });

  if (session.data.auth) {
    const userDetails = session.data.auth.userDetails;
    const tokenExpiration = session.data.auth.tokenExpiration;
    const now = Math.floor(new Date().valueOf() / 1000);
    if (tokenExpiration && tokenExpiration <= now) {
      console.info(`clearing expired session for ${userDetails?.id}`);
      await session.clear();
      return;
    }

    if (userDetails) {
      event.context.userDetails = userDetails;
    }
  }
});
