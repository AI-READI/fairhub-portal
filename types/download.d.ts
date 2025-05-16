import type { download_user_details } from "@prisma/client";

type SessionUserDetails = Omit<
  download_user_details,
  "created_at" | "updated_on"
>;

type LoginTokenClaims = Omit<
  SessionUserDetails,
  "id" | "phone" >;

type Attestation = {
  id: string;
  agreed: boolean;
  text: string;
  validationStatus?: "success" | "warning" | "error";
};

type DownloadAgreementProps = Partial<download_agreement>;

type DownloadAgreementFormState = Omit<
  DownloadAgreementProps,
  "id" | "user_details_id" | "dataset_id" | "created_at" | "updated_on"
>;

type BlobStorageCredentials = {
  accountName: string;
  containerName: string;
  sasToken: string;
  expirationDate: Date;
};