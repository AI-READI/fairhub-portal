import type { download_user_details } from "@prisma/client";

type SessionUserDetails = Omit<
  download_user_details,
  "created_at" | "updated_on"
>;

type LoginTokenClaims = Omit<SessionUserDetails, "id">;

type Attestation = {
  id: string;
  agreed: boolean;
  text: string;
  validationStatus?: "success" | "warning" | "error";
};
