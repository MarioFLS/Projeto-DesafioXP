import { IUser } from './interface.user';

export interface IAssetsEntry {assetId:number, amount:number, quantity:number}

export interface IAssetsOutput {id:number, price:number, quantity:number}

export interface IUserAsset extends IUser {
  Assets: IAssetsOutput[]
}
