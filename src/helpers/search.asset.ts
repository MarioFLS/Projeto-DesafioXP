import Asset from '../models/Asset';
import { IError } from '../interface/interface.error';
import Wallet from '../models/Wallet';
import HelpBalance from './check.balance';
import GetAssets from '../service/Assets/get.assets';

class HelpAssets {
  private _assets = Asset;

  async findAsset(id:number): Promise<Asset> {
    const assets = await this._assets.findOne({ where: { id } });
    return assets as Asset;
  }

  static async buyAsset(userId:number, id:number, quantity:number):
    Promise<number |IError> {
    try {
      const asset = await new GetAssets().buyAsset(id, quantity);
      const { price } = asset as {price:number};
      const value = Number(price) * quantity;
      const balance = await new HelpBalance(userId, value).withdraw();
      await Wallet.update(
        { balance },
        { where: { user_id: userId } },
      );

      return balance;
    } catch (error) {
      return error as IError;
    }
  }
}

export default HelpAssets;
