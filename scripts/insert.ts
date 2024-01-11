import { MongoClient } from "mongodb";
import "dotenv/config";

const func = async () => {
  const mongodbClient = new MongoClient(process.env.MONGODB_URI);
  await mongodbClient.connect();

  const db = mongodbClient.db(process.env.MONGODB_DB);

  const readme = `## Overview of the study
  The AI-READI project seeks to create and share a flagship ethically-sourced dataset of type 2 diabetes. The data will be optimized for future artificial intelligence/machine learning (AI/ML) analysis that could provide critical insights and especially shine a light on the salutogenic pathways from diabetes to return to health. Six cross-disciplinary project modules involving teams located across eight institutions are working together to develop this flagship dataset. The project will aim to collect data from 4,000 participants across three sites: the University of Alabama at Birmingham (UAB), the University of California San Diego (UCSD), and the University of Washington (UW). To ensure the data is population-representative, the 4,000 participants will be balanced for three factors: disease severity, ethnicity, and sex. More information about the study can be found on the study website at [aireadi.org](https://aireadi.org). 
  
  ## Description of the dataset
  This dataset contain data from 4 participants from the pilot study of the project. Details about the participants of the study are provided in the [participants.json](participants.json) metadata file. Data from multiple modalities are collected. A full list is provided in the "Data Standards" section below. The data in this dataset has been deidentified using awesome tools x, y, z and contain no personel health information (PHI).  
  
  The dataset contains a total of 1,265 files (including data and metadata files) and is 420 GB in size.
  
  ## Protocol
  The protocol followed:
  - For collecting the dataset can be found at [protocols.io](https://protocols.io/).
  
  - For curating and sharing the dataset can be found at [protocols.io](https://protocols.io/). 
  
  ## Dataset access/restrictions
  This dataset is publicly accessible without any restrictions under the terms of the license described below in the "License" section. For accessing a version of the dataset that contains PHI, follow the instructions available [here](https://aireadi.org/).
  
  ## Data standards followed
  This dataset is organized at the highest-level following the [Clinical Dataset Structure](https://github.com/AI-READI/high-level-dataset-structure). Each data type was organized according to either an existing standard if vailable for that data type or a newly developed one if no community agreed standard was found. Details are provided in the table below.
  
  | Data type      | Standards followed |
  | ----------- | ----------- |
  | Electrocardiogram      | [X standard]()       |
  | Optical Coherence Tomography   | [Y standard]()      |
  
  ## Resources
  All of our data files are in formats that are accessible with free software commonly used for such data types so no specific software is required.
  
  Besides the information contained in the various metadata files included in this dataset and the study website and protocols listed above, the manuscripts from the project listed below could provide more context for reusing the data:
  - AI-READI Project (2023). Some manuscript. Some Journal, 361(9353), 195-200. https://doi.org/10.5281/zenodo.7641684
  - AI-READI Project (2023). Another manuscript. Another Journal, 96(6), 266-272. https://doi.org/10.5281/zenodo.7641684
  
  ## License
  This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/). See the [LICENSE.txt](LICENSE.txt) file for the terms of the license.
  
  ## How to cite
   If you use this dataset for any purpose, please cite the dataset and the associated manuscript listed below:
   - AI-READI project. (2023). Flagship Dataset of Type 2 Diabetes from the AI-READI Project (1.0.0). Zenodo. https://doi.org/10.5281/zenodo.7641684
   - AI-READI Project (2023). AI-READI Marker Paper. Best Journal, 61(53), 95-180. https://doi.org/10.5281/zenodo.7641684
  
  ## Contact
  For any questions, suggestions, or feedback related to this dataset, please email contact@aireadi.org. We refer to the [study_description.json](study_description.json) and [dataset_description.json](dataset_description.json) metadata files for additional information about contact person/entity, authors, and contributors of the dataset.
  
  ## Acknowledgement
  This project is supported by the NIH-funded Bridge2AI program ([1OT2OD032644](https://reporter.nih.gov/search/1ADgncihCk6fdMRJdCnBjg/project-details/10471118)). The content is solely the responsibility of the authors and does not necessarily represent the official views of the NIH.`;

  const studyDescription = {
    ArmsInterventionsModule: {
      ArmGroupList: [
        {
          ArmGroupDescription: "This is the description of the arm metadata",
          ArmGroupLabel: "Label for Arm",
        },
        {
          ArmGroupDescription:
            "Add another description here for the arm metadata",
          ArmGroupLabel: "Arm Number 2",
        },
      ],
      InterventionList: [
        {
          InterventionArmGroupLabelList: ["0_0"],
          InterventionName: "O_0",
          InterventionOtherNameList: ["Other Names 0_0"],
          InterventionType: "Procedure/Surgery",
        },
      ],
    },
    ConditionsModule: {
      ConditionList: ["Diabetes", "Enlarged Kidney"],
      KeywordList: ["Dataset"],
    },
    ContactsLocationsModule: {
      CentralContactList: [
        {
          CentralContactAffiliation: "Scoutting Regime",
          CentralContactEMail: "sashagotanemail@fairhub.io",
          CentralContactName: "Sasha Braus",
          CentralContactPhone: "1-800-566-3823",
          CentralContactPhoneExt: "212",
        },
        {
          CentralContactAffiliation: "Affiliated by Philz Coffee",
          CentralContactEMail: "philz@fairhub.io",
          CentralContactName: "Number 2 Contact",
          CentralContactPhone: "909-33333-3333",
          CentralContactPhoneExt: "909",
        },
      ],
      LocationList: [
        {
          LocationCity: "sdfsdf",
          LocationCountry: "American Samoa",
          LocationFacility: "asdas",
          LocationState: "sdfs",
          LocationStatus: "Active, not recruiting",
          LocationZip: "sdf",
        },
      ],
      OverallOfficialList: [
        {
          OverallOfficialAffiliation: "asdasd",
          OverallOfficialName: "rasda",
          OverallOfficialRole: "Study Director",
        },
        {
          OverallOfficialAffiliation: "asda",
          OverallOfficialName: "asdas",
          OverallOfficialRole: "Study Principal Investigator",
        },
      ],
    },
    DescriptionModule: {
      BriefSummary: "Brief Summary",
    },
    DesignModule: {
      BioSpec: {
        BioSpecRetention: "Samples With DNA",
      },
      DesignInfo: {
        DesignObservationalModelList: ["Case-Control"],
        DesignTimePerspectiveList: ["Cross-sectional"],
      },
      EnrollmentInfo: {
        EnrollmentCount: "123",
        EnrollmentType: "Anticipated",
      },
      NumberGroupsCohorts: "123",
      StudyType: "Observational",
      TargetDuration: "5",
    },
    EligibilityModule: {
      EligibilityCriteria:
        "Inclusion Criteria\n* Intervention\n\nExclusion Criteria\n* Exlusion Criteria\n",
      Gender: "All",
      GenderBased: "Yes",
      GenderDescription: "",
      MaximumAge: "4 Days",
      MinimumAge: "1 Years",
      SamplingMethod: "Probability Sample",
      StudyPopulation: "Observed Population",
    },
    IdentificationModule: {
      OrgStudyIdInfo: {
        OrgStudyId: "sad",
        OrgStudyIdType: "NIH Grant Number",
      },
      SecondaryIdInfoList: [
        {
          SecondaryId: "test",
          SecondaryIdDomain: "dfasdf",
          SecondaryIdLink: "test",
          SecondaryIdType: "Other Grant/Funding Number",
        },
        {
          SecondaryId: "asda",
          SecondaryIdType: "EudraCT Number",
        },
      ],
    },
    IPDSharingStatementModule: {
      IPDSharing: "No",
    },
    OversightModule: {
      OversightHasDMC: "Yes",
    },
    ReferencesModule: {
      AvailIPDList: [
        {
          AvailIPDId: "asdsa",
          AvailIPDType: "Study Protocol",
          AvailIPDURL: "asd",
        },
      ],
      ReferenceList: [
        {
          ReferenceCitation: "Reference Number ONE",
          ReferenceType: "No",
        },
        {
          ReferenceCitation: "tesdfasdf",
        },
      ],
      SeeAlsoLinkList: [
        {
          SeeAlsoLinkLabel: "Reddit",
          SeeAlsoLinkURL: "reddit.com",
        },
        {
          SeeAlsoLinkURL: "home.google.com",
        },
      ],
    },
    SponsorCollaboratorsModule: {
      CollaboratorList: [
        {
          CollaboratorName: "Full Name Goes hErE",
        },
        {
          CollaboratorName: "Testing ONe Omre here",
        },
      ],
      LeadSponsor: {
        LeadSponsorName: "Testing Dtoria",
      },
      ResponsibleParty: {
        ResponsiblePartyInvestigatorAffiliation: "Investigator Affiliation",
        ResponsiblePartyInvestigatorFullName: "Testing Name",
        ResponsiblePartyInvestigatorTitle: "Investigator Title",
        ResponsiblePartyType: "Principal Investigator",
      },
    },
    StatusModule: {
      CompletionDateStruct: {
        CompletionDate: "December 15, 2023",
        CompletionDateType: "Anticipated",
      },
      OverallStatus: "Not yet recruiting",
      StartDateStruct: {
        StartDate: "November 16, 2023",
        StartDateType: "Anticipated",
      },
      WhyStopped: "dsfdsf",
    },
  };

  // Add the study_description to the metadata field of the dataset
  return await db.collection("dataset").updateOne(
    {
      identifier: 1,
    },
    {
      $set: {
        "metadata.readme": readme,
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
