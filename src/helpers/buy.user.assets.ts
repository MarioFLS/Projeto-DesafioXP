import userAssets from '../models/UserAssets';
import GetAssets from '../service/Assets/get.assets';
import { IError } from '../interface/interface.error';
import HelpUserAssets from './search.user.assets';
import UserLog from '../models/UserLog';
import HelpAssets from './search.asset';

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

  private async updateUserAsset(quantityToBuy:number, quantity:number):
  Promise<number[]> {
    const sumQuantity = quantityToBuy + Number(quantity);

    return this._userAsset.update({ quantity: sumQuantity }, {
      where: { userId: this._userId, assetId: this._assetId },
    }) as Promise<number[]>;
  }

  async buyUserAsset(quantityToBuy:number): Promise<userAssets | number[] | IError> {
    const asset = await HelpUserAssets.getUserAssets(this._userId, this._assetId);
    if (!asset) return this.createUserAsset(quantityToBuy);
    const { quantity } = asset?.toJSON() as { quantity:number};
    const amount = await new HelpAssets().findAsset(this._assetId);
    const { price } = amount.toJSON();
    const log = Date.now();
    await UserLog.create({
      userId: this._userId,
      assetId: this._assetId,
      type: 'compra',
      log,
      quantity: quantityToBuy,
      amount: price * quantityToBuy,
    });
    return this.updateUserAsset(quantityToBuy, quantity);
  }
}

export default HelpBuyUserAsset;
