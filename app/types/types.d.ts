export type AnyData = {
  [key: string]: any;
};
export type RequestResponse = {
  data: AnyData[],
  total: number;
  totalPages: number;
};

export type FormResult = {
  type: 'success' | 'error' | null
  message: string
  data: {
    [key:string]: any
  }
};
