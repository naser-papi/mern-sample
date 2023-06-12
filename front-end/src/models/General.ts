import { ReactNode } from "react";

export interface IInfo {
  email: string;
  password: string;
  new: boolean;
  id: string;
  handleInfoClick?:(id:string)=>void;
  selected?:boolean;
}
export interface IInfoState {
  infoList: IInfo[];
}

export interface IGeneralState {
  isBusy: boolean;
  notify?: INotifyBar;
}

export interface IAppState {
  info: IInfoState;
  general: IGeneralState;
}

export interface INotifyBar {
  type: "error" | "success" | "warning" | "info";
  message: string;
  icon?: ReactNode;
  show?: boolean;
}

export type ApiCallStatusType = "idle" | "pending" | "success" | "failed";
export type ApiMethodType = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
export interface IApiCallConfig {
  url: string;
  method: ApiMethodType;
  noToken?: boolean;
  noShowError?: boolean;
  successHandler?: (object) => void;
  failedHandler?: (object) => void;
  validate?: (object) => Promise<boolean>;
  getBody?: () => FormData | object;
}

export interface IInfoList {
  list:IInfo[],
  current:IInfo,
  handleInfoClick:(id:string)=>void;
}
