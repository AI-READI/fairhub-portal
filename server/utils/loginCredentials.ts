import { type AuthenticationResult } from "@azure/msal-node";
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

export async function convertTokenResponse(
  tokenResponse: AuthenticationResult,
) {
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
    organization: getStringTokenClaim(indexableClaims, "organization"),
    subject,
  });

  return userDetails;
}

export function getTokenExpiration(
  tokenResponse: AuthenticationResult,
  defaultExpiration: number = 3600,
): number {
  const indexableClaims = { ...tokenResponse.idTokenClaims };
  const expiration = getNumericTokenClaim(indexableClaims, "exp");

  return expiration ?? defaultExpiration;
}
