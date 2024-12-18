import { v4 as uuid } from "uuid";

import { LoginTokenClaims } from "~/types/download";

/**
 * Finds existing user details using the issuer and subject of the given token claims. If
 * user details do not already exist, a new record is created. Guarantees that user details
 * exist if a user has successfully logged in.
 *
 * @param loginTokenClaims
 * @returns persisted user details suitable for storing in the session
 */
export async function findOrCreateUserDetails(
  loginTokenClaims: LoginTokenClaims,
) {
  const selectProps = {
    id: true,
    affiliation: true,
    email: true,
    family_name: true,
    given_name: true,
    idp: true,
    issuer: true,
    subject: true,
  };

  const existingUser = await prisma.download_user_details.findUnique({
    select: selectProps,
    where: {
      oidc_user_id: {
        issuer: loginTokenClaims.issuer,
        subject: loginTokenClaims.subject,
      },
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const timestamp = currentUnixTimestamp();
  const userDetails = await prisma.download_user_details.create({
    data: {
      id: uuid(),
      created_at: timestamp,
      email: loginTokenClaims.email,
      family_name: loginTokenClaims.family_name,
      given_name: loginTokenClaims.given_name,
      idp: loginTokenClaims.idp,
      issuer: loginTokenClaims.issuer,
      subject: loginTokenClaims.subject,
      updated_on: timestamp,
    },
    select: selectProps,
  });

  return userDetails;
}
