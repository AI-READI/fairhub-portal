/**
 * Adds server-side account details to the state.
 */
export default defineNuxtRouteMiddleware((_to, _from) => {
  const nuxtApp = useNuxtApp();
  const { userDetails } = useUserDetails();

  if (nuxtApp.ssrContext && nuxtApp.ssrContext.event.context.userDetails) {
    userDetails.value = nuxtApp.ssrContext.event.context.userDetails;
  }
});
