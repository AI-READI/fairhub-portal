import {
  type AuthenticationResult,
  AuthorizationCodeRequest,
} from "@azure/msal-node";
import createMsalClient from "../utils/msalClient";

type StringIndexable = { [key: string]: unknown };

function getTokenClaim(
  tokenClaims: StringIndexable,
  claimName: string,
): unknown | null {
  if (claimName in tokenClaims) {
    return tokenClaims[claimName];
  }

  return null;
}

function getStringTokenClaim(
  tokenClaims: StringIndexable,
  claimName: string,
): string | null {
  const claimValue = getTokenClaim(tokenClaims, claimName);
  if (typeof claimValue === "string") {
    return claimValue;
  }

  return null;
}

function getNumericTokenClaim(
  tokenClaims: StringIndexable,
  claimName: string,
): number | null {
  const claimValue = getTokenClaim(tokenClaims, claimName);
  if (typeof claimValue === "number") {
    return claimValue;
  }

  return null;
}

function getEmail(tokenResponse: AuthenticationResult): string {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let email = "";

  if (
    tokenResponse.account?.username &&
    emailRegex.test(tokenResponse.account.username)
  ) {
    email = tokenResponse.account.username;
  } else if ("emails" in tokenResponse.idTokenClaims) {
    const emails = getTokenClaim({ ...tokenResponse.idTokenClaims }, "emails");
    email =
      Array.isArray(emails) && typeof emails[0] === "string" ? emails[0] : "";
  }

  return email;
}

function convertTokenResponse(
  tokenResponse: AuthenticationResult,
): SessionUserDetails {
  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const id = getStringTokenClaim(indexableClaims, "oid");
  const email = getEmail(tokenResponse);

  if (!id) {
    throw new Error("ID could not be extracted from token response");
  }

  if (!email) {
    throw new Error("Email could not be extracted from token response");
  }

  return {
    id,
    affiliation: getStringTokenClaim(indexableClaims, "affiliation"),
    email,
    family_name: getStringTokenClaim(indexableClaims, "family_name"),
    given_name: getStringTokenClaim(indexableClaims, "given_name"),
    organization: getStringTokenClaim(indexableClaims, "organization"),
    phone: getStringTokenClaim(indexableClaims, "phone"),
  };
}

function getTokenExpiration(
  tokenResponse: AuthenticationResult,
  defaultExpiration: number = 3600,
): number {
  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const expiration = getNumericTokenClaim(indexableClaims, "exp");

  return expiration ?? defaultExpiration;
}

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

  const clientApplication = createMsalClient();

  const tokenRequest: AuthorizationCodeRequest = {
    clientInfo: query.client_info as string,
    code: query.code as string,
    codeVerifier: session.data.auth.pkceCodes.verifier,
    redirectUri: config.public.ENTRA_CONFIG.redirectUri,
    scopes: ["openid", "email", "profile"],
  };

  try {
    const tokenResponse =
      await clientApplication.acquireTokenByCode(tokenRequest);

    const sessionUserDetails = convertTokenResponse(tokenResponse);
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

    const redirectTo = query.state ? (query.state as string) : "/";
    await sendRedirect(event, redirectTo);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Login could not be processed",
    });
  }
});
