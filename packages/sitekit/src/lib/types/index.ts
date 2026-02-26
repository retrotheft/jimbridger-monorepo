export type DataPoint = {
  date: string;
  value: number;
};

export type DataSet = {
  data: DataPoint[];
  color: string;
  label?: string;
};
