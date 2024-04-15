import { PrismaClient } from "@prisma/client";
import DatasetRecord from "../dev/datasetRecord.json";
import "dotenv/config";

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

  const firstRecord = await prisma.published_dataset.findUnique({
    where: {
      id: "1",
    },
  });

  if (!firstRecord) {
    console.log("No record found, exiting function");
    return;
  }

  const updatedRecord = await prisma.published_dataset.update({
    data: {
      title: DatasetRecord.title,
      data: DatasetRecord.data,
      dataset_id: DatasetRecord.dataset_id,
      description: DatasetRecord.description,
      doi: DatasetRecord.doi,
      files: DatasetRecord.files,
      published_metadata: DatasetRecord.published_metadata,
      study_id: DatasetRecord.study_id,
      study_title: DatasetRecord.study_title,
      version_id: DatasetRecord.version_id,
      version_title: DatasetRecord.version_title,
    },
    where: {
      id: "1",
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
