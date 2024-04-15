export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = useUserDetails();
  if (!authenticated.value) {
    return navigateTo(
      `${window.location.origin}/login-redirect?redirectTo=${to.fullPath}`,
      { external: true },
    );
  }
});
