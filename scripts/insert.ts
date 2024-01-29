import { MongoClient } from "mongodb";
import "dotenv/config";

const func = async () => {
  const mongodbClient = new MongoClient(process.env.MONGODB_URI);
  await mongodbClient.connect();

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const datasetDescription = [
    {
      creatorName: "The University Of Manchester",
      nameIdentifier: [
        {
          nameIdentifierScheme: "ORCID",
          nameIdentifierValue: "0000-0002-4306-4464",
          schemeURI: "https://orcid.org",
        },
      ],
      nameType: "Organizational",
    },
    {
      affiliation: [
        {
          affiliationIdentifier: "0000-0002-4306-4464",
          affiliationIdentifierScheme: "ORCID",
          affiliationValue: "University Of Marlen",
          schemeURI: "https://orcid.org",
        },
      ],
      creatorName: "Bertoit Hoover",
      nameIdentifier: [
        {
          nameIdentifierScheme: "ROR",
          nameIdentifierValue: "https://ror.org/04wxnsj81",
          schemeURI: "https://ror.org",

        },
      ],
      nameType: "Personal",
    },
    {
      affiliation: [
        {
          affiliationIdentifier: "0000-0002-4306-4464",
          affiliationIdentifierScheme: "ORCID",
          affiliationValue: "University Of Marlen",
          schemeURI: "https://orcid.org",
        },
      ],
      creatorName: "Bertoit Hoover",
      nameIdentifier: [
        {
          nameIdentifierScheme: "ROR",
          nameIdentifierValue: "https://ror.org/04wxnsj81",
          schemeURI: "https://ror.org",
        },
      ],
      nameType: "Personal",
    },
    {
      affiliation: [
        {
          affiliationIdentifier: "0000-0002-4306-4464",
          affiliationIdentifierScheme: "SCHEME TEST",
          affiliationValue: "University Of Marlen",
          schemeURI: "https://scheme.org",
        },
      ],
      creatorName: "Bertoit Hoover",
      nameIdentifier: [
        {
          nameIdentifierScheme: "UHHHH",
          nameIdentifierValue: "https://scheme.org/04wxnsj81",
          schemeURI: "https://scheme.org",
        },
      ],
      nameType: "Personal",

    },
  ];

  // Add the study_description to the metadata field of the dataset
  return await db.collection("dataset").updateOne(
    {
      identifier: 2,
    },
    {
      $set: {
        "metadata.dataset_description.Creator": datasetDescription,

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
