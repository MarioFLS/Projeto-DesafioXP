export interface IUser {
  id:number,
  name:string,
  balance:number
}

export interface IBalance extends IUser {
  wallet:{balance:number}
}

export type token = {
  name:string;
  id:number;
}
