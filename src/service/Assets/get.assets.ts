import { StatusCodes } from 'http-status-codes';
import Asset from '../../models/Asset';
import { IAsset } from '../../interface/interface.asset';
import { IError } from '../../interface/interface.error';

class GetAssets {
  private _assets = Asset;

  async allAssets(): Promise<Asset[]> {
    const asset = await this._assets.findAll();
    return asset;
  }

  async assetId(id:number): Promise<IAsset | IError> {
    const asset = await this._assets.findOne({ where: { id } });
    if (!asset) {
      return {
        error: {
          code: StatusCodes.BAD_REQUEST,
          message: 'Não existe ativo com esse ID',
        },
      };
    }
    return asset?.toJSON() as IAsset;
  }
}

export default GetAssets;
