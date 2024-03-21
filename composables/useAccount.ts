/**
 * Provides access to account information for the currently logged-in account.
 */
export function useAccount() {
  const { accounts } = useAuthClient();

  const authenticated = computed(
    () => accounts.value && accounts.value.length >= 1,
  );

  const account = computed(() =>
    accounts.value && accounts.value.length ? accounts.value[0] : null,
  );

  return {
    account,
    authenticated,
  };
}
