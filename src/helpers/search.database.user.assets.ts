import userAssets from '../models/UserAssets';
import GetAssets from '../service/Assets/get.assets';
import { IError } from '../interface/interface.error';

class HelpUserAssetBuy {
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
      purchasePrice: result,
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
    const newAsset = { purchasePrice: result, quantity: sumQuantity };
    return this._userAsset
      .update(newAsset, {
        where: {
          userId: this._userId,
          assetId: this._assetId,
        },
      }) as Promise<number[]>;
  }

  async getUserAsset(quantityToBuy:number): Promise<userAssets | number[] | IError> {
    const asset = await this._userAsset.findOne({
      where: { userId: this._userId, assetId: this._assetId },
    });
    if (!asset) return this.createUserAsset(quantityToBuy);
    const { purchasePrice, quantity } = asset?.toJSON() as {
      purchasePrice:number, quantity:number};
    return this.updateUserAsset(quantityToBuy, purchasePrice, quantity);
  }
}

export default HelpUserAssetBuy;
