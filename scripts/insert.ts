import { MongoClient } from "mongodb";
import "dotenv/config";

const func = async () => {
  const mongodbClient = new MongoClient(process.env.MONGODB_URI);
  await mongodbClient.connect();

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const datasetDescription = [
    {
      affiliation: [
        {
          affiliationIdentifier: "04wxnsj81",
          affiliationIdentifierScheme: "ROR",
          affiliationValue: "University of Chicago",
          schemeURI: "https://ror.org/04wxnsj81",
        },
      ],
      contributorName: "Light Yagami",
      contributorType: "DataCollector",
      nameIdentifier: [
        {
          nameIdentifierScheme: "ORCID",
          nameIdentifierValue: "0000-0002-4306-4464",
          schemeURI: "https://orcid.org/0000-0002-4306-4464",
        },
      ],
      nameType: "Personal",
    },
    {
      contributorName: "City of Chicago",
      contributorType: "Editor",
      nameIdentifier: [
        {
          nameIdentifierScheme: "ROR",
          nameIdentifierValue: "04wxnsj81",
          schemeURI: "https://ror.org/04wxnsj81",
        },
      ],
      nameType: "Organizational",
    },
  ];

  // Add the study_description to the metadata field of the dataset
  return await db.collection("dataset").updateOne(
    {
      identifier: 1,
    },
    {
      $set: {
        "metadata.dataset_description.Contributor": datasetDescription,
      },
    }
  );
};

const main = async () => {
  await func();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
