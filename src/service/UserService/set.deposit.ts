import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import Wallet from '../../models/Wallet';

class SetDeposit {
  static async setDeposit(param:number, balance:number): Promise<number[] | IError> {
    const result = await Wallet.update({ balance }, { where: { user_id: param } });
    if (!result[0]) {
      return {
        error: {
          code: StatusCodes.NOT_FOUND,
          message: 'Alguma coisa deu errado no seu Saque. Tente novamente!',
        },
      };
    }
    return result;
  }
}

export default SetDeposit;
