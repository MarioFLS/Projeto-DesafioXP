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

  async saleAsset(id:number, soldAmount:number): Promise<IError | number> {
    const asset = await this.assetId(id);
    const { amount, price } = asset as IAsset;
    const amountSum = amount + soldAmount;
    await this._assets.update({ amount: amountSum }, { where: { id } });
    return Number(price) * soldAmount;
  }

  async buyAsset(id:number, quantityPurchased:number): Promise<IAsset | IError> {
    const asset = await this.assetId(id);
    const { amount } = asset as IAsset;
    if (amount === 0) {
      throw {
        error: {
          code: StatusCodes.NOT_ACCEPTABLE,
          message: 'Não possuimos mais esse ativo no estoque',
        },
      };
    }
    const result = Number(amount - quantityPurchased);
    if (result <= 0) {
      throw {
        error: {
          code: StatusCodes.NOT_ACCEPTABLE,
          message: 'Não possuimos essa quantidade de ativos no estoque',
        },
      };
    }
    if (result > 0) {
      await this._assets.update({ amount: result }, { where: { id } });
    }
    return asset;
  }
}

export default GetAssets;
