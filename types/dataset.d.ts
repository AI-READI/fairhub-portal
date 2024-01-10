interface Dataset {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
  creators: string[];
}

interface DatasetArrayItem {
  id: number;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}
