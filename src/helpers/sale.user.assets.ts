import { StatusCodes } from 'http-status-codes';
import userAssets from '../models/UserAssets';
import HelpUserAssets from './search.user.assets';
import GetAssets from '../service/Assets/get.assets';
import HelpBalance from './check.balance';
import Wallet from '../models/Wallet';
import UserLog from '../models/UserLog';
import HelpAssets from './search.asset';

class HelpSaleUserAssets {
  private _userAsset = userAssets;
  private _userId: number;
  private _assetId: number;

  constructor(userId:number, assetId:number) {
    this._userId = userId;
    this._assetId = assetId;
  }
  async updateUserAsset(soldAmount:number) {
    const asset = await HelpUserAssets.getUserAssets(this._userId, this._assetId);
    const { quantity } = asset.toJSON();
    const value = await new GetAssets().saleAsset(this._assetId, soldAmount);
    const balance = await new HelpBalance(this._userId, Number(value)).deposit();
    await Wallet.update({ balance }, { where: { user_id: this._userId } });
    const amount = await new HelpAssets().findAsset(this._assetId);
    const { price } = amount.toJSON();
    const log = Date.now();
    await UserLog.create({
      userId: this._userId,
      assetId: this._assetId,
      type: 'venda',
      log,
      quantity: soldAmount,
      amount: price * soldAmount,
    });
    return quantity;
  }
  async saleUserAsset(quantitySale:number) {
    const asset = await this.updateUserAsset(quantitySale);
    const result = asset - quantitySale;
    if (result < 0) {
      return {
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: 'Você não pode vender mais do que os ativos que tem.',
        },
      };
    }
    if (result > 0) {
      return this._userAsset
        .update(
          { quantity: result },
          { where: { user_id: this._userId, assetId: this._assetId } },
        );
    }
    return this._userAsset
      .destroy({ where: { user_id: this._userId, assetId: this._assetId } });
  }
}

export default HelpSaleUserAssets;
