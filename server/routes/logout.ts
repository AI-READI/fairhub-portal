/**
 * Logs the user out.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await useSession(event, {
    password: config.sessionPassword,
  });

  let logoutUri = `${config.public.ENTRA_CONFIG.authority}/oauth2/v2.0/`;
  logoutUri += `logout?post_logout_redirect_uri=${config.public.ENTRA_CONFIG.logoutUri}`;

  if (event.context.userDetails) {
    await session.clear();
  }

  await sendRedirect(event, logoutUri);
});
