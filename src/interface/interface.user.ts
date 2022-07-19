export interface IBalance {
  name:string,
  id:number,
  wallet:{balance:number}
}

export interface IUserBalance {
  id:number,
  name:string,
  balance:number
}

export type token = {
  name:string;
  id:number;
}
