import HelpUserAssetBuy from '../../helpers/search.database.user.assets';
import HelpAssets from '../../helpers/search.asset';
import { IError } from '../../interface/interface.error';

class Investment {
  static async buyAssets(userId: number, assetId:number, quantity:number):
    Promise<number[] | IError | void> {
    try {
      const balance = await HelpAssets.buyAsset(userId, assetId, quantity);
      const { error } = balance as IError;
      if (error) { return balance as IError; }
      const result = await new HelpUserAssetBuy(userId, assetId).getUserAsset(quantity);
      return result as number[];
      // return b;
    } catch (error) {
      return error as IError;
    }
  }
}

export default Investment;
