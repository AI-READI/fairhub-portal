import type { DownloadAgreementFormState } from "~/types/download";

/**
 * Provides access to the cookie where the answers about the user's research purpose are stored.
 */
export default function useDownloadAgreementForm(datasetid: string) {
  return useState<DownloadAgreementFormState>(
    `dataset-${datasetid}-research-purpose-state`,
    () => ({}),
  );
}
