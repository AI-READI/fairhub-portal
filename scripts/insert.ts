import { MongoClient } from "mongodb";
import "dotenv/config";

const func = async () => {
  const mongodbClient = new MongoClient(process.env.MONGODB_URI);
  await mongodbClient.connect();

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const datasetDescription = {
    AccessDetails: {
      description:
        "Description of the Public Download Access. We provide free for all people (as long as you have internet)",
    },
    AccessType: "PublicDownloadSelfAttestationRequired",
    AlternateIdentifier: [
      {
        alternateIdentifierType: "EAN13",
        alternateIdentifierValue: "asd",
      },
    ],
    Contributor: [
      {
        affiliation: [
          {
            affiliationValue: "sdfsdf",
          },
        ],
        contributorName: "Abraham Lincoln",
        contributorType: "DataCollector",
        nameIdentifier: [
          {
            nameIdentifierScheme: "identifier scheme",
            nameIdentifierValue: "Identifier",
          },
        ],
        nameType: "Personal",
      },
    ],
    Creator: [
      {
        affiliation: [
          {
            affiliationValue: "University of In n Out",
          },
        ],
        creatorName: "Testing Name here",
        nameIdentifier: [
          {
            nameIdentifierScheme: "ORCIRD",
            nameIdentifierValue: "Name Identifier",
          },
        ],
        nameType: "Personal",
      },
    ],
    DatasetConsent: {
      consentGeneticOnly: true,
      consentGeogRestrict: true,
      consentNoMethods: true,
      consentNoncommercial: true,
      consentResearchType: true,
      consentType: "GeneralResearchUse",
    },
    DatasetDeIdentLevel: {
      deIdentDates: true,
      deIdentDirect: true,
      deIdentHIPAA: false,
      deIdentKAnon: false,
      deIdentNonarr: false,
      deIdentType: "DeIdentificationApplied",
    },
    DatasetRecordKeys: {
      keysType: "Pseudonymised",
    },
    Date: [
      {
        dateInformation: "Copyright striked by YouTube",
        dateType: "Copyrighted",
        dateValue: "2023-12-04T00:00:00Z",
      },
      {
        dateType: "Collected",
        dateValue: "2023-12-28T00:00:00Z",
      },
    ],
    Description: [
      {
        descriptionType: "Abstract",
        descriptionValue:
          "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      },
      {
        descriptionType: "TableOfContents",
        descriptionValue:
          "Description for Dataset. The dataset is full of data that is useful for knowledge",
      },
    ],
    FundingReference: [
      {
        awardNumber: {
          awardNumberValue: "Award Number: 050106",
        },
        funderIdentifier: {
          funderIdentifierValue: "1234",
        },
        funderName: "Funding Name Org",
      },
    ],
    Identifier: {
      identifierType: "DOI",
      identifierValue: "1928aec8-3eae-4970-b22e-ff025527319a",
    },
    Language: "ja",
    ManagingOrganisation: {
      name: "Dr. Suess Inc",
    },
    PublicationYear: "2024",
    Publisher: "Dr. Suess",
    RelatedIdentifier: [],
    RelatedItem: [
      {
        title: [
          {
            titleValue: "Family Name, Petter",
          },
          {
            titleType: "Subtitle",
            titleValue: "Griffin, Petttter",
          },
        ],
        contributor: [
          {
            contributorName: "Contributed By Mike",
            contributorType: "Editor",
            nameType: "Organizational",
          },
        ],
        creator: [
          {
            creatorName: "Creator Here",
            nameType: "Personal",
          },
          {
            creatorName: "Carl's JR",
            nameType: "Organizational",
          },
        ],
        relatedItemIdentifier: [
          {
            relatedItemIdentifierType: "bibcode",
            relatedItemIdentifierValue: "License",
          },
        ],
        relatedItemType: "ComputationalNotebook",
        relationType: "IsContinuedBy",
      },
    ],
    ResourceType: {
      resourceTypeGeneral: "Dataset",
      resourceTypeValue: "tesdt",
    },
    Rights: [
      {
        rightsIdentifier: "h",
        rightsIdentifierScheme: "h",
        rightsURI: "44",
        rightsValue: "Glide",
      },
    ],
    Size: [],
    Subject: [
      {
        classificationCode: "CLASSIFIED BY THE CIA",
        schemeURI: "BEST URI",
        subjectScheme: "Scheme of all schemes",
        subjectValue: "Test Subject One",
        valueURI: "Priceless URI",
      },
      {
        subjectValue: "SUBJECT 2",
      },
    ],
    Title: [
      {
        titleValue: "Tasty Wooden Computer",
      },
      {
        titleType: "AlternativeTitle",
        titleValue: "New Wooden Computer",
      },
    ],
    Version: "c2cab241-418d-4d9a-aecf-9fad9a8b2e15",
  };

  // Add the study_description to the metadata field of the dataset
  return await db.collection("dataset").updateOne(
    {
      identifier: 1,
    },
    {
      $set: {
        "metadata.datasetDescription": datasetDescription,
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
