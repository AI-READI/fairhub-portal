export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = useUserDetails();
  const config = useRuntimeConfig();

  if (!authenticated.value) {
    return navigateTo(
      `${config.public.BASE_URL}/login-redirect?redirectTo=${to.fullPath}`,
      {
        external: true,
      },
    );
  }
});
