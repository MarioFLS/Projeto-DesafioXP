import { IError } from '../../interface/interface.error';
import User from '../../models/User';
import userAssets from '../../models/UserAssets';
import { IAssetsEntry, IUserAsset } from '../../interface/interface.user.assets';
import HelpAssets from '../../helpers/search.asset';

class GetAssets {
  static async getAssets(param:number): Promise<IUserAsset | IError | any> {
    const result = await User.findOne({
      where: { id: param },
      attributes: ['id', 'name'],
      include: [{
        model: userAssets,
        as: 'Assets',
        attributes: ['assetId', 'quantity'],
      }],
    });
    const assets = result?.toJSON();

    assets.Assets = await Promise.all(assets.Assets.map(async (asset:IAssetsEntry) => {
      const priceAssets = await new HelpAssets().findAsset(asset.assetId);
      const { price, name } = priceAssets.toJSON();
      return {
        id: asset.assetId,
        name,
        quantity: asset.quantity,
        amount: price * asset.quantity,
      };
    }));

    return assets;
  }
}

export default GetAssets;
