import { IError } from '../../interface/interface.error';
import User from '../../models/User';
import userAssets from '../../models/UserAssets';
import { IAssetsEntry, IUserAsset } from '../../interface/interface.user.assets';

class GetAssets {
  static async getAssets(param:number): Promise<IUserAsset | IError> {
    const result = await User.findOne({
      where: { id: param },
      attributes: ['id', 'name'],
      include: [{
        model: userAssets,
        as: 'Assets',
        attributes: ['assetId', 'purchasePrice', 'quantity'],
      }],
    });
    const assets = result?.toJSON();
    assets.Assets = assets.Assets.length > 0
      ? assets.Assets.map((asset:IAssetsEntry) => ({
        id: asset.assetId,
        price: asset.purchasePrice,
        quantity: asset.quantity,
      })) : 'Você não possui Ativos no momento';

    return assets;
  }
}

export default GetAssets;
