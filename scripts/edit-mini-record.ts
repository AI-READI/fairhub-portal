import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import MiniDatasetRecord from "../dev/miniDatasetRecord.json";

const prisma = new PrismaClient();

const main = async () => {
  const { DATABASE_URL } = process.env;

  // if the domain is from azure exit the function
  if (!DATABASE_URL) {
    return;
  }

  const databaseOnAzure = DATABASE_URL.includes("azure");

  if (databaseOnAzure) {
    console.log("Azure database detected, exiting function");
    return;
  }

  const record = await prisma.published_dataset.findUnique({
    where: {
      id: "4",
    },
  });

  if (!record) {
    console.log("No record found, exiting function");
  }

  /**
   * ! disabling the update operation
   */

  const updatedRecord = await prisma.published_dataset.update({
    data: {
      title: MiniDatasetRecord.title,
      dataset_id: MiniDatasetRecord.dataset_id,
      description: MiniDatasetRecord.description,
      doi: MiniDatasetRecord.doi,
      files: MiniDatasetRecord.files,
      published_metadata: MiniDatasetRecord.published_metadata,
      study_id: MiniDatasetRecord.study_id,
      study_title: MiniDatasetRecord.study_title,
      version_id: MiniDatasetRecord.version_id,
      version_title: MiniDatasetRecord.version_title,
    },
    where: {
      id: "4",
    },
  });

  console.log("Updated record", updatedRecord);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
