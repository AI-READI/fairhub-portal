import {
  type AccountInfo,
  InteractionStatus,
  PublicClientApplication,
} from "@azure/msal-browser";
import { getCurrentInstance, type Ref, toRefs } from "vue";

export type MsalContext = {
  accounts: Ref<AccountInfo[]>;
  authClient: PublicClientApplication;
  inProgress: Ref<InteractionStatus>;
};

/**
 * Provides access to the MSAL.js authentication client and related state.
 */
export function useAuthClient(): MsalContext {
  const internalInstance = getCurrentInstance();
  if (!internalInstance) {
    throw new Error(
      "useMsal() cannot be called outside the setup() function of a component",
    );
  }
  const { accounts, authClient, inProgress } = toRefs(
    internalInstance.appContext.config.globalProperties.$msal,
  );

  if (!authClient.value || !accounts.value || !inProgress.value) {
    throw new Error("Please install the msalPlugin");
  }

  if (inProgress.value === InteractionStatus.Startup) {
    authClient.value.initialize().then(() => {
      authClient.value.handleRedirectPromise().catch(() => {
        // Errors should be handled by listening to the LOGIN_FAILURE event
      });
    });
  }

  return {
    accounts,
    authClient: authClient.value,
    inProgress,
  };
}
