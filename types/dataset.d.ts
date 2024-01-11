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
  DescriptionModule: {
    BriefSummary: string;
    DetailedDescription: string;
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
