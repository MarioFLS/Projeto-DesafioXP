import userAssets from '../models/UserAssets';
import HelpUserAssets from './search.user.assets';

class HelpSaleUserAssets {
  private _userAsset = userAssets;
  private _userId: number;
  private _assetId: number;

  constructor(userId:number, assetId:number) {
    this._userId = userId;
    this._assetId = assetId;
  }

  async saleUserAsset() {
    const asset = await HelpUserAssets.getUserAssets(this._userId, this._assetId);
    console.log(asset.toJSON());
  }
}

(async () => {
  console.log(await new HelpSaleUserAssets(1, 1).saleUserAsset());
})();
export default HelpSaleUserAssets;
