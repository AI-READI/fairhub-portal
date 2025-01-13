import {
  type AuthenticationResult,
  AuthorizationCodeRequest,
} from "@azure/msal-node";
import createMsalClient from "../utils/msalClient";
import { findOrCreateUserDetails } from "../utils/getOrCreateUserDetails";

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
  } else if (
    "email" in tokenResponse.idTokenClaims &&
    typeof tokenResponse.idTokenClaims.email === "string" &&
    emailRegex.test(tokenResponse.idTokenClaims.email)
  ) {
    email = tokenResponse.idTokenClaims.email;
  } else if ("emails" in tokenResponse.idTokenClaims) {
    const emails = getTokenClaim({ ...tokenResponse.idTokenClaims }, "emails");
    email =
      Array.isArray(emails) && typeof emails[0] === "string" ? emails[0] : "";
  } else if ("otherMails" in tokenResponse.idTokenClaims) {
    const otherMails = getTokenClaim(
      { ...tokenResponse.idTokenClaims },
      "otherMails",
    );
    email =
      Array.isArray(otherMails) && typeof otherMails[0] === "string"
        ? otherMails[0]
        : "";
  }
  return email;
}

async function convertTokenResponse(tokenResponse: AuthenticationResult) {
  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const issuer = getStringTokenClaim(indexableClaims, "iss");
  const subject = getStringTokenClaim(indexableClaims, "sub");
  const email = getEmail(tokenResponse);

  if (!issuer) {
    throw new Error("Issuer could not be extracted from token response");
  }

  if (!subject) {
    throw new Error("Subject could not be extracted from token response");
  }

  if (!email) {
    throw new Error("Email could not be extracted from token response");
  }

  const userDetails = await findOrCreateUserDetails({
    affiliation: getStringTokenClaim(indexableClaims, "affiliation"),
    email,
    family_name: getStringTokenClaim(indexableClaims, "family_name"),
    given_name: getStringTokenClaim(indexableClaims, "given_name"),
    idp: getStringTokenClaim(indexableClaims, "idp"),
    issuer,
    subject,
  });

  return userDetails;
}

function getTokenExpiration(
  tokenResponse: AuthenticationResult,
  defaultExpiration: number = 3600,
): number {
  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const expiration = getNumericTokenClaim(indexableClaims, "exp");

  return expiration ?? defaultExpiration;
}

function checkTokenIdPIsValid(tokenResponse: AuthenticationResult): string {
  const adversarialIdpPatterns = [
    /(\.cn\/)/, // People's Republic of China
    /(\.hk\/)/, // Hong Kong
    /(\.ve\/)/, // Venezuela
    /(\.cu\/)/, // Cuba
    /(\.ir\/)/, // Iran
    /(\.kp\/)/, // Democratic People's Republic of Korea
    /(\.ru\/)/, // Russian Federation
  ];
  const selfAttestationIdPPatterns = [
    /(sts\.windows\.net)/,
    /(github\.com)/,
    /(orcid\.org)/,
    /(microsoftonline\.com)/,
    /(google\.com)/,
    /(amazonaws\.com)/,
    /(saml\.nelnet\.net)/,
    /(miracosta\.fedgw\.com)/,
    /(cirrusidentity)/,
  ];

  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const idpName = getStringTokenClaim(indexableClaims, "idp");

  if (idpName === null) {
    return "invalid";
  }
  if (selfAttestationIdPPatterns.some((pattern) => pattern.test(idpName))) {
    return "invalid";
  }
  if (adversarialIdpPatterns.some((pattern) => pattern.test(idpName))) {
    return "adversarial";
  }
  return "valid";
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
    let redirectTo;
    const tokenResponse =
      await clientApplication.acquireTokenByCode(tokenRequest);

    const idpType = checkTokenIdPIsValid(tokenResponse);

    // check token for forbidden IdPs
    if (idpType === "valid") {
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

      redirectTo = query.state ? (query.state as string) : "/";
    } else {
      // redirect to 404
      let logoutUri = `${config.public.ENTRA_CONFIG.authority}/oauth2/v2.0/`;
      logoutUri += `logout?post_logout_redirect_uri=${config.public.ENTRA_CONFIG.forbiddenUri}?type=${encodeURIComponent(idpType)}`;
      redirectTo = logoutUri;
    }

    await sendRedirect(event, redirectTo);
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Login could not be processed",
    });
  }
});
