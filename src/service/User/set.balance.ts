import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import Wallet from '../../models/Wallet';
import HelpBalance from '../../helpers/check.balance';

class SetBalance {
  static async setBalance(param:number, valor:number, type:string):
    Promise<number | IError> {
    try {
      const balance = await new HelpBalance(param, valor)[type as keyof HelpBalance]();
      const result = await Wallet.update({ balance }, { where: { user_id: param } });
      if (!result[0]) {
        return {
          error: {
            code: StatusCodes.NOT_FOUND,
            message: 'Alguma coisa deu errado no seu Saque. Tente novamente!',
          },
        };
      }
      return balance;
    } catch (error) {
      return error as IError;
    }
  }
}

export default SetBalance;
