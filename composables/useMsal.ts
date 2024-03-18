import {
  type AccountInfo,
  InteractionStatus,
  PublicClientApplication,
} from "@azure/msal-browser";
import { getCurrentInstance, type Ref, toRefs } from "vue";

export type MsalContext = {
  accounts: Ref<AccountInfo[]>;
  inProgress: Ref<InteractionStatus>;
  instance: PublicClientApplication;
};

export function useMsal(): MsalContext {
  const internalInstance = getCurrentInstance();
  if (!internalInstance) {
    throw new Error(
      "useMsal() cannot be called outside the setup() function of a component",
    );
  }
  const { accounts, inProgress, instance } = toRefs(
    internalInstance.appContext.config.globalProperties.$msal,
  );

  if (!instance.value || !accounts.value || !inProgress.value) {
    throw new Error("Please install the msalPlugin");
  }

  if (inProgress.value === InteractionStatus.Startup) {
    instance.value.initialize().then(() => {
      instance.value.handleRedirectPromise().catch(() => {
        // Errors should be handled by listening to the LOGIN_FAILURE event
      });
    });
  }

  return {
    accounts,
    inProgress,
    instance: instance.value,
  };
}
