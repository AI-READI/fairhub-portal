import { type SessionUserDetails } from "~/types/download";

/**
 * Provides access to information for the currently logged-in user.
 */
export default function useUserDetails(): {
  authenticated: ComputedRef<boolean>;
  userDetails: Ref<SessionUserDetails | null>;
} {
  const userDetails = useState<SessionUserDetails | null>(
    "userDetails",
    () => null,
  );

  return {
    authenticated: computed(() => userDetails.value !== null),
    userDetails,
  };
}
