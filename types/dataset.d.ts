interface Dataset {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
  creators: string[];
  metadata: {
    readme: string;
    studyDescription: [key: string]: any ;
  };
}

interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}
