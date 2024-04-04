/**
 * Logs the user out.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await useSession(event, {
    password: config.sessionPassword,
  });

  if (event.context.userDetails) {
    await session.clear();
  }

  await sendRedirect(event, "/");
});
