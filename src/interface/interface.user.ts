export interface IUser {
  id:number,
  name:string,
  balance:number
}

export interface IBalance extends IUser {
  wallet:{balance:number}
}

export interface INewUser {
  name:string,
  email:string,
  password:string,
}

export type Usertoken = {
  name:string;
  id:number;
}
