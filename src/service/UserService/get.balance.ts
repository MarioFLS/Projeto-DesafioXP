import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { IBalance, IUser } from '../../interface/interface.user';
import User from '../../models/User';
import Wallet from '../../models/Wallet';

class GetBalance {
  static async getBalance(param:number, name:string): Promise<IUser | IError> {
    const result = await User.findOne({
      where: { id: param },
      attributes: ['name', 'id'],
      include: [{ model: Wallet, as: 'wallet', attributes: ['balance'] }],
    });
    const { id, wallet: { balance } } = result?.toJSON() as IBalance;
    return { id, name, balance };
  }
}

export default GetBalance;
