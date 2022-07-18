import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { IBalance, IUserBalance } from '../../interface/interface.user';
import User from '../../models/User';
import Wallet from '../../models/Wallet';

class GetBalance {
  static async getBalance(param:number): Promise<IUserBalance | IError> {
    const result = await User.findOne({
      where: { id: param },
      attributes: ['name', 'id'],
      include: [{ model: Wallet, as: 'wallet', attributes: ['balance'] }],
    });
    if (result) {
      const { name, id, wallet: { balance } } = result?.toJSON() as IBalance;
      return { id, name, balance };
    }
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'Esse usuário não existe! Tente Outro',
      },
    };
  }
}

export default GetBalance;
