interface Dataset {
  id: string;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
  creators: string[];
}

interface DatasetArrayItem {
  id: string;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}
