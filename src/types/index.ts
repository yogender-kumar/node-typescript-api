export interface Error {
  status: number;
  message: string;
}

export interface IObject {
  [key: string]: { prop: any };
}
