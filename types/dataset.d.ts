interface StudyDescription {
  [key: string]: any;
}
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

interface Dataset {
  id: number;
  updatedOn: number;
  files: Files[];
  createdAt: number;
  title: string;
  description: string;
  creators: string[];
  metadata: Metadata;
}

export interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}

export interface Files {
  children?: Files[];
  label: string;
}

export interface Metadata{
    dataSheet: string;
    readme: string;
    studyDescription: string | any;
    datasetDescription: string | any;
}