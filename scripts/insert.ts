import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import DatasetRecord from "../dev/datasetRecord.json";

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

  const recordsExist = await prisma.published_dataset.findMany();

  if (recordsExist.length > 0) {
    console.log("Records exist, exiting function");
  }

  await prisma.published_dataset.create({
    data: {
      id: DatasetRecord.id,
      title: DatasetRecord.title,
      created_at: parseInt(DatasetRecord.created_at),
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
  });

  console.log("Record inserted", DatasetRecord);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
