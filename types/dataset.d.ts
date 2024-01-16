interface DatasetDescription {
  Identifier: {
    identifierValue: string;
    identifierType: string;
  };
  Title: {
    titleType?: string;
    titleValue: string;
  }[];
  Version: string;
  AlternateIdentifier?: {
    alternateIdentifierType: string;
    alternateIdentifierValue: string;
  }[];
  Creator: {
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
      affiliationValue?: string;
    }[];
  }[];
  Contributor?: {
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
      affiliationValue?: string;
    }[];
  }[];
  PublicationYear: string;
  Date?: {
    dateValue: string;
    dateType: string;
    dateInformation?: string;
  }[];
  ResourceType: {
    resourceTypeGeneral: string;
    resourceTypeValue: string;
  }[];
  DatasetDeIdentLevel: {
    deIdentType: string;
    deIdentDirect: boolean;
    deIdentHIPAA: boolean;
    deIdentDates: boolean;
    deIdentNonarr: boolean;
    deIdentKanon: boolean;
    deIdentDetails?: string;
  };
  DatasetConsent: {
    consentType: string;
    consentNoncommercial: boolean;
    consentGeogRestrict: boolean;
    consentResearchType: boolean;
    consentGeneticOnly: boolean;
    consentNoMethods: boolean;
    consentsDetails?: string;
  };
  Description?: {
    descriptionType: string;
    descriptionValue: string;
  }[];
  Language?: string;
  RelatedIdentifier?: {
    relatedIdentifierType: string;
    relatedIdentifierValue: string;
    relationType: string;
    relatedMetadataScheme?: string;
    schemeURI?: string;
    schemeType?: string;
    resourceTypeGeneral?: string;
  }[];
  Subject?: {
    subjectValue: string;
    subjectScheme?: string;
    schemeURI?: string;
    valueURI?: string;
    classificationCode?: string;
  }[];
  ManagingOrganisation: {
    name: string;
    rorId?: string;
  };
  AcessType: string;
  AcessDetails: {
    description: string;
    url: string;
    urlLastChecked: string;
  };
  Rights: {
    rightsValue: string;
    rightsURI?: string;
    rightsIdentifier?: string;
    rightsIdentifierScheme?: string;
  }[];
  Publisher: string;
  Size?: string[];
  FundingReference?: {
    funderName: string;
    funderIdentifier?: {
      funderIdentifierValue: string;
      funderIdentifierType?: string;
    };
    awardNumber?: {
      awardNumberValue: string;
      awardURI?: string;
    };
    awardTitle?: string;
  }[];
  RelatedItem?: {
    relatedItemType: string;
    relationType: string;
    relatedItemIdentifier?: {
      relatedItemIdentifierValue: string;
      relatedItemIdentifierType?: string;
      relatedMetadataScheme?: string;
      schemeURI?: string;
      schemeType?: string;
    }[];
    creator: {
      creatorName: string;
      nameType: string;
    }[];
    title: {
      titleType?: string;
      titleValue: string;
    }[];
    publicationYear?: string;
    volume?: string;
    issue?: string;
    number: {
      numberType?: string;
      numberValue: string;
    };
    firstPage?: string;
    lastPage?: string;
    publisher?: string;
    edition?: string;
    contributor?: {
      contributorName: string;
      contributorType: string;
      nameType: string;
    }[];
  }[];
}

interface DatasetCreator {
  givenName: string;
  familyName: string;
}

interface DatasetCreators extends Array<DatasetCreator> {}

interface DatasetCreator {
  givenName: string;
  familyName: string;
}

interface Study {
  title: string;
  id: string;
}

interface DatasetCreators extends Array<DatasetCreator> {}

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
    NumberArms: string;
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
interface Dataset {
  id: number;
  keywords: string[];
  updatedOn: number;
  createdAt: number; // unix timestamp - the date the dataset was published
  title: string;
  description: string;
  creators: DatasetCreators;
  metadata: {
    dataSheet: string;
    readme: string;
    studyDescription: StudyDescription;
    datasetDescription: DatasetDescription;
  };
  studyTitle: string;
}

interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number; // unix timestamp - the date the dataset was published
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}

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
