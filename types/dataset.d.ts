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
    GenderBased: {};
    GenderDescription: string;
    MinimumAge: string;
    MaximumAge: string;
    HealthyVolunteers?: string;
    EligibilityCriteria: string;
    StudyPopulation?: string;
    SamplingMethod?: string;
  };
  IdentificationModule: {
    OrgStudyId: string;
    OrgStudyIdType: string;
    OrgStudyIdDomain?: string;
    OrgStudyIdLink?: string;
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
    OverSightHasDMC?: string;
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
    LeadSponsorName: {
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

interface DatasetDescription {
  [key: string]: any;
}

interface Study {
  title: string;
}
interface Dataset {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
  creators: string[];
  metadata: {
    dataSheet: string;
    readme: string;
    studyDescription: StudyDescription;
    datasetDescription: DatasetDescription;
  };
  study: Study;
}

interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}
