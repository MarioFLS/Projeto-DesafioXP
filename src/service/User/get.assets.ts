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
        attributes: ['assetId', 'amount', 'quantity'],
      }],
    });
    const assets = result?.toJSON();
    console.log('aqui mesmo');
    assets.Assets = assets.Assets.map((asset:IAssetsEntry) => ({
      id: asset.assetId,
      amount: asset.amount,
      quantity: asset.quantity,
    }));

    return assets;
  }
}

export default GetAssets;
