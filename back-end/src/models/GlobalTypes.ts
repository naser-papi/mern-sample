export interface IError {
  status?: null;
  message?: string;
}

export type MapType = object & {
  delete: Function;
  set: Function;
  get: Function;
};

export type IDoc<T extends {}> = T & {
  save: Function;
};
