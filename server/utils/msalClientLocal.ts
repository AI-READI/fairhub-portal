import { ConfidentialClientApplication } from "@azure/msal-node";

/**
 * Constructs the MSAL confidential client application used for authentication requests.
 *
 * @returns MSAL.js client application
 */
export default function createLocalMsalClient() {
  const config = useRuntimeConfig();

  const authConfig = {
    ...config.public.LOCAL_LOGIN_CONFIG,
    clientSecret: config.entraClientSecret,
  };

  console.log("Local MSAL Config:", {
    authority: authConfig.authority,
    clientId: authConfig.clientId,
    clientSecret: authConfig.clientSecret,
    clientSecretExists: !!authConfig.clientSecret,
  });
  return new ConfidentialClientApplication({
    auth: authConfig,
  });
}
