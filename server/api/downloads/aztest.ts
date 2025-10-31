import { BlobServiceClient } from "@azure/storage-blob";
import type { BlobStorageCredentials } from "~/types/download";

export default defineEventHandler(async (event) => {
  const postBody = await readBody(event);

  const storage = <BlobStorageCredentials>{
    accountName: postBody.accountName,
    containerName: postBody.containerName,
    expirationDate: postBody.expirationDate,
    sasToken: postBody.sasToken,
  };

  const bsc = new BlobServiceClient(
    `https://${storage.accountName}.blob.core.windows.net?${storage.sasToken}`,
  );
  const containerClient = bsc.getContainerClient(storage.containerName);
  const content = "Hello from AI-READI!";
  const blobName = "ai-readi-test-" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(content, content.length);
  } catch (error) {
    console.error("Error creating blob:", error);
    return false;
  }

  return true;
});
