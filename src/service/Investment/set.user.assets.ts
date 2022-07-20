import HelpUserAssetBuy from '../../helpers/search.database.user.assets';
import HelpAssets from '../../helpers/search.asset';

class Investment {
  static async buyAssets(userId: number, assetId:number, quantity:number) {
    try {
      await HelpAssets.buyAsset(userId, assetId, quantity);
      return await new HelpUserAssetBuy(userId, assetId).getUserAsset(quantity);
    } catch (error) {
      return error;
    }
  }
}

export default Investment;
