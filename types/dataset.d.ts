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
  alternateIdentifier?: {
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
  managingOrganization: {
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
  armsInterventionsModule: {
    armGroupList: {
      armGroupLabel: string;
      armGroupType?: string;
      armGroupInterventionList?: string[];
      armGroupDescription: string;
    }[];
    interventionList: {
      interventionType: string;
      interventionName: string;
      interventionDescription: string;
      interventionOtherNameList?: string[];
    }[];
  };
  conditionsModule: {
    conditionList: {
      conditionName: string;
      conditionIdentifier?: {
        conditionClassificationCode: string;
        conditionScheme: string;
        schemeURI?: string;
        conditionURI?: string;
      };
    }[];
    keywordList?: {
      keywordValue: string;
      keywordIdentifier?: {
        keywordClassificationCode: string;
        keywordScheme: string;
        schemeURI?: string;
        keywordURI?: string;
      };
    }[];
  };
  contactsLocationsModule: {
    centralContactList: {
      centralContactFirstName: string;
      centralContactLastName: string;
      centralContactDegree?: string;
      centralContactIdentifier?: {
        centralContactIdentifierValue: string;
        centralContactIdentifierScheme: string;
        schemeURI?: string;
      }[];
      centralContactAffiliation: {
        centralContactAffiliationName: string;
        centralContactAffiliationIdentifier?: {
          centralContactAffiliationIdentifierValue: string;
          centralContactAffiliationIdentifierScheme: string;
          schemeURI?: string;
        };
      };
      centralContactPhone?: string;
      centralContactPhoneExt?: string;
      centralContactEMail: string;
    }[];
    locationList: {
      locationFacility: string;
      locationStatus: string;
      locationCity: string;
      locationState?: string;
      locationZip?: string;
      locationCountry: string;
      locationIdentifier?: {
        locationIdentifierValue: string;
        locationIdentifierScheme: string;
        schemeURI?: string;
      };
      locationContactList?: {
        locationContactFirstName: string;
        locationContactLastName: string;
        locationContactIdentifier?: {
          locationContactIdentifierValue: string;
          locationContactIdentifierScheme: string;
          schemeURI?: string;
        }[];
        locationContactRole: string;
        locationContactPhone: string;
        locationContactEMail: string;
        locationContactPhoneExt?: string;
      }[];
    }[];
    overallOfficialList?: {
      overallOfficialFirstName: string;
      overallOfficialLastName: string;
      overallOfficialDegree: string;
      overallOfficialIdentifier?: {
        overallOfficialIdentifierValue: string;
        overallOfficialIdentifierScheme: string;
        schemeURI?: string;
      }[];
      overallOfficialAffiliation: {
        overallOfficialAffiliationName: string;
        overallOfficialAffiliationIdentifier?: {
          overallOfficialAffiliationIdentifierValue: string;
          overallOfficialAffiliationIdentifierScheme: string;
          schemeURI?: string;
        };
      };
      overallOfficialRole: string;
    }[];
  };
  descriptionModule: {
    briefSummary: string;
    detailedDescription: string;
  };
  designModule: {
    bioSpec?: {
      bioSpecRetention: string;
      bioSpecDescription?: string;
    };
    designInfo: {
      designAllocation?: string;
      designInterventionModel?: string;
      designIterventionModelDescription?: string;
      designObservationalModelList?: string[];
      designMaskingInfo?: {
        designMasking: string;
        designMaskingDescription?: string;
        designWhoMaskedList: string[];
      };
      designObservationModel?: string;
      designPrimaryPurpose?: string;
      designTimePerspectiveList?: string[];
    };
    enrollmentInfo: {
      enrollmentCount: string;
      enrollmentType: string;
    };
    numberArms?: string;
    phaseList?: string[];
    studyType: string;
    targetDuration: string;
    isPatientRegistry?: string;
    numberGroupsCohorts: int;
  };
  eligibilityModule: {
    sex: string;
    genderBased: string;
    genderDescription?: string;
    minimumAge: string;
    maximumAge: string;
    healthyVolunteers: string;
    eligibilityCriteria: {
      eligibilityCriteriaInclusion: string[];
      eligibilityCriteriaExclusion: string[];
    };
    studyPopulation?: string;
    samplingMethod?: string;
  };
  identificationModule: {
    officialTitle: string;
    acronym?: string;
    orgStudyIdInfo: {
      orgStudyId: string;
      orgStudyIdType: string;
      orgStudyIdDomain?: string;
      orgStudyIdLink?: string;
    };
    secondaryIdInfoList?: {
      secondaryId: string;
      secondaryIdType: string;
      secondaryIdLink?: string;
      secondaryIdDomain?: string;
    }[];
  };
  oversightModule: {
    isFDARegulatedDrug?: string;
    isFDARegulatedDevice?: string;
    humanSubjectReviewStatus: string;
    oversightHasDMC?: string;
  };
  sponsorCollaboratorsModule: {
    responsibleParty: {
      responsiblePartyType: string;
      responsiblePartyInvestigatorFirstName?: string;
      responsiblePartyInvestigatorLastName?: string;
      responsiblePartyInvestigatorTitle?: string;
      responsiblePartyInvestigatorIdentifier?: {
        responsiblePartyInvestigatorIdentifierValue: string;
        responsiblePartyInvestigatorIdentifierScheme: string;
        schemeURI?: string;
      }[];
      responsiblePartyInvestigatorAffiliation?: {
        responsiblePartyInvestigatorAffiliationName: string;
        responsiblePartyInvestigatorAffiliationIdentifier?: {
          responsiblePartyInvestigatorAffiliationIdentifierValue: string;
          responsiblePartyInvestigatorAffiliationIdentifierScheme: string;
          schemeURI?: string;
        };
      };
    };
    leadSponsor: {
      leadSponsorName: string;
      leadSponsorIdentifier: {
        leadSponsorIdentifierValue: string;
        leadSponsorIdentifierScheme: string;
        schemeURI?: string;
      };
    };
    collaboratorList?: {
      collaboratorName: string;
      collaboratorNameIdentifier: {
        collaboratorNameIdentifierValue: string;
        collaboratorNameIdentifierScheme: string;
        schemeURI?: string;
      };
    }[];
  };
  statusModule: {
    overallStatus: string;
    whyStopped?: string;
    startDateStruct: {
      startDate: string;
      startDateType: string;
    };
    completionDateStruct: {
      completionDate: string;
      completionDateType: string;
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

interface DatasetStructureDescriptionSubDirectory {
  directoryName: string;
  directoryType: string;
  directoryDescription: string;
  subdirectory?: DatasetStructureDescriptionSubDirectory[];
}

interface DatasetStructureDescription {
  datasetStructure: {
    directoryName: string;
    directoryType: string;
    directoryDescription: string;
    relatedTerm: {
      relatedTermValue: string;
    }[];
    relatedStandard: {
      standardName: string;
      standardDescription: string;
      standardUse: string;
      standardRelatedIdentifier: {
        relatedIdentifierValue: string;
        relatedIdentifierType: string;
        relationType: string;
      }[];
      standardIdentifier?: {
        identifierValue: string;
        identifierType: string;
      }[];
    }[];
    subDirectory: DatasetStructureDescriptionSubDirectory[];
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
  readme: string;
  studyDescription: StudyDescription;
  datasetDescription: DatasetDescription;
  datasetStructureDescription: DatasetStructureDescription;
  healthsheet: HealthsheetRecords;
}

interface AdditionalData {
  size: number;
  fileCount: number;
}

interface Dataset {
  id: string;
  study_id: string;
  dataset_id: string;
  version_id: string;
  doi: string;
  title: string;
  description: string;
  version_title: string;
  study_title: string;
  metadata: Metadata;
  files: FolderStructure[];
  data: AdditionalData;
  created_at: number;
}

interface DatasetArray extends Array<Dataset> {}

interface FolderStructure {
  children?: FolderStructure[];
  label: string;
}

interface Version {
  id: string;
  title: string;
}

interface VersionArrayItem {
  id: string;
  createdAt: number;
  title: string;
  doi: string;
}

interface VersionArray extends Array<VersionArrayItem> {}
