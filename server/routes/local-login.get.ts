import { AuthorizationCodeRequest } from "@azure/msal-node";
import createLocalMsalClient from "../utils/msalClientLocal";
import {
  convertTokenResponse,
  getTokenExpiration,
} from "../utils/loginCredentials";

/**
 * Completes login requests by converting the authorization_code obtained by the first leg
 * for an ID token.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const session = await useSession(event, {
    password: config.sessionPassword,
  });

  const clientApplication = createLocalMsalClient();

  const tokenRequest: AuthorizationCodeRequest = {
    clientInfo: query.client_info as string,
    code: query.code as string,
    codeVerifier: session.data.auth.pkceCodes.verifier,
    redirectUri: config.public.LOCAL_LOGIN_CONFIG.redirectUri,
    scopes: ["openid", "email", "profile"],
  };

  try {
    const redirectTo = query.state ? (query.state as string) : "/";
    const tokenResponse =
      await clientApplication.acquireTokenByCode(tokenRequest);

    const sessionUserDetails = await convertTokenResponse(tokenResponse);
    const tokenExpiration = getTokenExpiration(tokenResponse);
    await session.update({
      auth: {
        idToken: tokenResponse.idToken,
        idTokenClaims: tokenResponse.idTokenClaims,
        pkceCodes: null,
        tokenExpiration,
        userDetails: sessionUserDetails,
      },
    });

    await sendRedirect(event, redirectTo);
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Login could not be processed",
    });
  }
});
