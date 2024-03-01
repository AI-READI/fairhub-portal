interface DatasetDescription {
  identifier: {
    identifierValue: string;
    identifierType: string;
  };
  title: {
    titleType?: string;
    titleValue: string;
  }[];
  version: string;
  lternateIdentifier?: {
    alternateIdentifierType: string;
    alternateIdentifierValue: string;
  }[];
  creator: {
    creatorName: string;
    nameType: string;
    nameIdentifier?: {
      nameIdentifierValue: string;
      nameIdentifierScheme: string;
      schemeURI?: string;
    }[];
    affiliation?: {
      affiliationIdentifier?: string;
      affiliationIdentifierScheme?: string;
      schemeURI?: string;
      affiliationName?: string;
    }[];
  }[];
  contributor?: {
    contributorName: string;
    contributorType: string;
    nameType: string;
    nameIdentifier?: {
      nameIdentifierValue: string;
      nameIdentifierScheme: string;
      schemeURI?: string;
    }[];
    affiliation?: {
      affiliationIdentifier?: string;
      affiliationIdentifierScheme?: string;
      schemeURI?: string;
      affiliationName?: string;
    }[];
  }[];
  publicationYear: string;
  date?: {
    dateValue: string;
    dateType: string;
    dateInformation?: string;
  }[];
  resourceType: {
    resourceTypeGeneral: string;
    resourceTypeValue: string;
  }[];
  datasetDeIdentLevel: {
    deIdentType: string;
    deIdentDirect: boolean;
    deIdentHIPAA: boolean;
    deIdentDates: boolean;
    deIdentNonarr: boolean;
    deIdentKAnon: boolean;
    deIdentDetails?: string;
  };
  datasetConsent: {
    consentType: string;
    consentNoncommercial: boolean;
    consentGeogRestrict: boolean;
    consentResearchType: boolean;
    consentGeneticOnly: boolean;
    consentNoMethods: boolean;
    consentsDetails?: string;
  };
  description?: {
    descriptionType: string;
    descriptionValue: string;
  }[];
  language?: string;
  relatedIdentifier?: {
    relatedIdentifierType: string;
    relatedIdentifierValue: string;
    relationType: string;
    relatedMetadataScheme?: string;
    schemeURI?: string;
    schemeType?: string;
    resourceTypeGeneral?: string;
  }[];
  subject?: {
    subjectValue: string;
    subjectScheme?: string;
    schemeURI?: string;
    valueURI?: string;
    classificationCode?: string;
  }[];
  managingOrganisation: {
    name: string;
    rorId?: string;
  };
  acessType: string;
  acessDetails: {
    description: string;
    url: string;
    urlLastChecked: string;
  };
  rights: {
    rightsName: string;
    rightsURI?: string;
    rightsIdentifier?: string;
    rightsIdentifierScheme?: string;
    schemeURI?: string;
  }[];
  publisher: {
    publisherName: string;
    publisherIdentifier?: string;
    publisherIdentifierScheme?: string;
    schemeURI?: string;
  };
  size?: string[];
  format?: string[];
  fundingReference?: {
    funderName: string;
    funderIdentifier: {
      funderIdentifierValue: string;
      funderIdentifierType: string;
    };
    awardNumber?: {
      awardNumberValue: string;
      awardURI?: string;
    };
    awardTitle?: string;
  }[];
  relatedIdentifier?: {
    relatedIdentifierValue: string;
    relatedIdentifierType: string;
    relationType: string;
    resourceTypeGeneral?: string;
    relatedMetadataScheme?: string;
    schemeURI?: string;
    schemeType?: string;
  }[];
}

interface DatasetCreator {
  givenName: string;
  familyName: string;
}

interface DatasetCreator {
  givenName: string;
  familyName: string;
}

interface DatasetCreators extends Array<DatasetCreator> {}
interface Study {
  title: string;
  id: string;
}

interface StudyDescription {
  ArmsInterventionsModule: {
    ArmGroupList: {
      ArmGroupLabel: string;
      ArmGroupDescription: string;
    }[];
    InterventionList: {
      InterventionType: string;
      InterventionName: string;
      InterventionOtherNameList: string[];
      InterventionArmGroupLabelList: string[];
    }[];
  };
  ConditionsModule: {
    ConditionList: string[];
    KeywordList: string[];
  };
  ContactsLocationsModule: {
    CentralContactList?: {
      CentralContactAffiliation: string;
      CentralContactName: string;
      CentralContactPhone: string;
      CentralContactEMail: string;
      CentralContactPhoneExt?: string;
    }[];
    LocationList: {
      LocationFacility: string;
      LocationCity: string;
      LocationState?: string;
      LocationZip?: string;
      LocationStatus: string;
      LocationCountry: string;
      LocationContactList?: {
        LocationContactName: string;
        LocationContactRole: string;
        LocationContactPhone: string;
        LocationContactEMail: string;
        LocationContactPhoneExt?: string;
      }[];
    }[];
    OverallOfficialList?: {
      OverallOfficialName: string;
      OverallOfficialAffiliation: string;
      OverallOfficialRole: string;
    }[];
  };
  DescriptionModule: {
    BriefSummary: string;
    DetailedDescription: string;
  };
  DesignModule: {
    BioSpec?: {
      BioSpecRetention: string;
      BioSpecDescription?: string;
    };
    DesignInfo: {
      DesignAllocation?: string;
      DesignInterventionModel?: string;
      DesignIterventionModelDescription?: string;
      DesignObservationalModelList?: string[];
      DesignMaskingInfo?: {
        DesignMasking: string;
        DesignMaskingDescription?: string;
        DesignWhoMaskedList: string[];
      };
      DesignObservationModel?: string;
      DesignPrimaryPurpose?: string;
      DesignTimePerspectiveList?: string[];
    };
    EnrollmentInfo: {
      EnrollmentCount: string;
      EnrollmentType: string;
    };
    NumberArms?: string;
    PhaseList?: string[];
    StudyType: string;
    TargetDuration: string;
    NumberGroupsCohorts: int;
  };
  EligibilityModule: {
    Gender: string;
    GenderBased: string;
    GenderDescription?: string;
    MinimumAge: string;
    MaximumAge: string;
    HealthyVolunteers?: string;
    EligibilityCriteria: string;
    StudyPopulation?: string;
    SamplingMethod?: string;
  };
  IdentificationModule: {
    OrgStudyIdInfo: {
      OrgStudyId: string;
      OrgStudyIdType: string;
    };
    SecondaryIdInfoList?: {
      SecondaryId: string;
      SecondaryIdType: string;
      SecondaryIdLink?: string;
      SecondaryIdDomain?: string;
    }[];
  };
  IPDSharingStatementModule: {
    IPDSharing: string;
    IPDSharingDescription?: string;
    IPDSharingInfoTypeList?: string[];
    IPDSharingTimeFrame?: string;
    IPDSharingAccessCriteria?: string;
    IPDSharingURL?: string;
  };
  OversightModule: {
    OversightHasDMC?: string;
  };
  ReferencesModule: {
    ReferenceList?: {
      ReferenceID?: string;
      ReferenceType?: string;
      ReferenceCitation: string;
    }[];
    SeeAlsoLinkList?: {
      SeeAlsoLinkLabel?: string;
      SeeAlsoLinkURL: string;
    }[];
    AvailIPDList?: {
      AvailIPDId: string;
      AvailIPDType: string;
      AvailIPDURL: string;
      AvailIPDComment?: string;
    }[];
  };
  SponsorCollaboratorsModule: {
    ResponsibleParty: {
      ResponsiblePartyType: string;
      ResponsiblePartyInvestigatorFullName?: string;
      ResponsiblePartyInvestigatorTitle?: string;
      ResponsiblePartyInvestigatorAffiliation?: string;
    };
    LeadSponsor: {
      LeadSponsorName: string;
    };
    CollaboratorList?: {
      CollaboratorName: string;
    }[];
  };
  StatusModule: {
    OverallStatus: string;
    WhyStopped?: string;
    StartDateStruct: {
      StartDate: string;
      StartDateType: string;
    };
    CompletionDateStruct?: {
      CompletionDate: string;
      CompletionDateType: string;
    };
  };
}

interface DatatypeDictionary {
  code_name: string;
  datatype_description: {
    description_text: string;
    description_source?: {
      organization: {
        full_name: string;
        link: string;
      };
    };
    source?: {
      link: string;
    };
  };
  aliases?: string[];
  related_terms?: string[];
  related_standards?: {
    full_name: string;
    reference: string;
    standard_description: string;
  }[];
}

interface HealthsheetRecord {
  id: number;
  question: string;
  response: string;
}

interface HealthsheetRecords {
  motivation: HealthsheetRecord[];
  composition: HealthsheetRecord[];
  collection: HealthsheetRecord[];
  preprocessing: HealthsheetRecord[];
  uses: HealthsheetRecord[];
  distribution: HealthsheetRecord[];
  maintenance: HealthsheetRecord[];
}

interface Metadata {
  dataSheet: string;
  readme: string;
  studyDescription: StudyDescription;
  datasetDescription: DatasetDescription;
  datatypeDictionary: DatatypeDictionary[];
  healthsheet: HealthsheetRecords;
}

interface Dataset {
  id: number;
  keywords: string[];
  updatedOn: number;
  files: FolderStructure[];
  createdAt: number; // unix timestamp - the date the dataset was published
  title: string;
  description: string;
  metadata: Metadata;
  creators: DatasetCreators;
  studyTitle: string;
}

interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number; // unix timestamp - the date the dataset was published
  title: string;
  description: string;
  keywords: string[];
  version: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}

interface FolderStructure {
  children?: FolderStructure[];
  label: string;
}

interface Version {
  id: string;
  title: string;
}

interface VersionArrayItem {
  id: number;
  createdAt: number;
  title: string;
  doi: string;
}

interface VersionArray extends Array<VersionArrayItem> {}

interface DatabaseDatasetRecord extends Dataset {
  _id: string;
  identifier: number;
  doi: string;
  fairhub: {
    // contains the original ids from fairhub study management portal
    dataset: {
      id: string;
    };
    study: Study;
    version: Version;
  };
}
