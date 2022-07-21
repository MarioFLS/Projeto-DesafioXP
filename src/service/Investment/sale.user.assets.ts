import { StatusCodes } from 'http-status-codes';
import HelpSaleUserAssets from '../../helpers/sale.user.assets';
import { IError } from '../../interface/interface.error';

class InvestmentSale {
  static async saleAssets(userId: number, assetId:number, quantity:number):
    Promise<number[] | IError | void> {
    try {
      const balance = await new HelpSaleUserAssets(userId, assetId)
        .saleUserAsset(quantity);

      return balance as number[];
    } catch (error) {
      return {
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: 'Você não possui esse ativo para venda',
        },
      };
    }
  }
}

export default InvestmentSale;
