import { ConfidentialClientApplication } from "@azure/msal-node";

/**
 * Constructs the MSAL confidential client application used for authentication requests.
 *
 * @returns MSAL.js client application
 */
export default function createMsalClient() {
  const config = useRuntimeConfig();

  return new ConfidentialClientApplication({
    auth: {
      ...config.public.ENTRA_CONFIG,
      clientSecret: config.entraClientSecret,
    },
  });
}
