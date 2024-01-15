
export interface Dataset {
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

export interface DatasetArray extends Array<DatasetArrayItem> {}

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