import userAssets from '../models/UserAssets';
import GetAssets from '../service/Assets/get.assets';
import { IError } from '../interface/interface.error';
import HelpUserAssets from './search.user.assets';

class HelpBuyUserAsset {
  private _userAsset = userAssets;
  private _userId:number;
  private _assetId:number;

  constructor(userId:number, assetId:number) {
    this._userId = userId;
    this._assetId = assetId;
  }

  private async createUserAsset(quantity:number): Promise<userAssets| IError> {
    const asset = await new GetAssets().assetId(this._assetId);
    const { error } = asset as IError;
    if (error) return asset as IError;
    const { price } = asset as {price:number};
    const result = price * quantity;
    const newAsset = {
      userId: this._userId,
      assetId: this._assetId,
      amount: result,
      quantity,
    };
    return this._userAsset.create(newAsset);
  }

  private async updateUserAsset(quantityToBuy:number, value:number, quantity:number):
  Promise<number[]> {
    const asset = await new GetAssets().assetId(this._assetId);
    const { price } = asset as {price:number};
    const result = Number(price) * quantityToBuy + Number(value);
    const sumQuantity = quantityToBuy + Number(quantity);
    const newAsset = { amount: result, quantity: sumQuantity };
    return this._userAsset
      .update(newAsset, {
        where: {
          userId: this._userId,
          assetId: this._assetId,
        },
      }) as Promise<number[]>;
  }

  async buyUserAsset(quantityToBuy:number): Promise<userAssets | number[] | IError> {
    const asset = await HelpUserAssets.getUserAssets(this._userId, this._assetId);
    if (!asset) return this.createUserAsset(quantityToBuy);
    const { amount, quantity } = asset?.toJSON() as {
      amount:number, quantity:number};
    return this.updateUserAsset(quantityToBuy, amount, quantity);
  }
}

export default HelpBuyUserAsset;
