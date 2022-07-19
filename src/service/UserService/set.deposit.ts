import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import Wallet from '../../models/Wallet';
import Balance from '../../helpers/check.balance';

class SetDeposit {
  static async setDeposit(param:number, valor:number): Promise<number | IError> {
    const balance = await new Balance(param, valor).deposit();
    const result = await Wallet.update({ balance }, { where: { user_id: param } });
    if (!result[0]) {
      return {
        error: {
          code: StatusCodes.NOT_FOUND,
          message: 'Alguma coisa deu errado no seu Saque. Tente novamente!',
        },
      };
    }
    return Number(balance.toFixed(2));
  }
}

export default SetDeposit;
