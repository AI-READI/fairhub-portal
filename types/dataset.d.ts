interface Dataset {}

interface DatasetArrayItem {
  id: string;
  updatedOn: number;
  createdAt: number;
  title: string;
  description: string;
}

interface DatasetArray extends Array<DatasetArrayItem> {}
