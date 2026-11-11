import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import MactelDatasetRecord from "../dev/mactelDatasetRecord.json";

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
      id: "6",
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
      title: MactelDatasetRecord.title,
      dataset_id: MactelDatasetRecord.dataset_id,
      description: MactelDatasetRecord.description,
      doi: MactelDatasetRecord.doi,
      files: MactelDatasetRecord.files,
      published_metadata: MactelDatasetRecord.published_metadata,
      study_id: MactelDatasetRecord.study_id,
      study_title: MactelDatasetRecord.study_title,
      version_id: MactelDatasetRecord.version_id,
      version_title: MactelDatasetRecord.version_title,
    },
    where: {
      id: "6",
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
