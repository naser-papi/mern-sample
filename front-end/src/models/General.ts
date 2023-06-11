export interface IInfo{
    email:string,
    password:string
}
export interface IInfoState{
    infoList:IInfo[],
    isBusy:boolean
}

export interface IAppState{
    info:IInfoState
}

export interface IAppInfo{
    email:string,
    password:string,
    new:boolean
}