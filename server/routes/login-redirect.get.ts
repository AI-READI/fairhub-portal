import { AuthorizationUrlRequest, CryptoProvider } from "@azure/msal-node";
import createMsalClient from "../utils/msalClient";

/**
 * Initiates the authentication flow by sending an authenticaton code request.
 * @see auth-response.get.ts for response handling
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const session = await useSession(event, {
    password: config.sessionPassword,
  });

  const clientApplication = createMsalClient();

  const cryptoProvider = new CryptoProvider();
  const { challenge, verifier } = await cryptoProvider.generatePkceCodes();
  const pkceCodes = {
    challenge,
    challengeMethod: "S256",
    verifier,
  };

  await session.update({ auth: { pkceCodes } });

  const authUrlParams: AuthorizationUrlRequest = {
    codeChallenge: pkceCodes.challenge,
    codeChallengeMethod: pkceCodes.challengeMethod,
    redirectUri: config.public.ENTRA_CONFIG.redirectUri,
    scopes: ["openid", "email", "profile"],
  };

  if (query.redirectTo && typeof query.redirectTo === "string") {
    authUrlParams.state = query.redirectTo;
  }

  const redirectUrl = await clientApplication.getAuthCodeUrl(authUrlParams);
  await sendRedirect(event, redirectUrl);
});
