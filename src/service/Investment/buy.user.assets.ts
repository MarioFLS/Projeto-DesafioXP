import HelpBuyUserAsset from '../../helpers/buy.user.assets';
import HelpAssets from '../../helpers/search.asset';
import { IError } from '../../interface/interface.error';

class InvestmentBuy {
  static async buyAssets(userId: number, assetId:number, quantity:number):
    Promise<number[] | IError | void> {
    try {
      const balance = await HelpAssets.buyAsset(userId, assetId, quantity);
      const { error } = balance as IError;

      if (error) { return balance as IError; }
      const result = await new HelpBuyUserAsset(userId, assetId).buyUserAsset(quantity);
      console.log('aqui o result>>', result);
      return result as number[];
    } catch (error) {
      return error as IError;
    }
  }
}

export default InvestmentBuy;
