export type AnyData = {
  [key: string]: any;
};
export type RequestResponse = {
  data: AnyData[],
  total: number;
  totalPages: number;
};
