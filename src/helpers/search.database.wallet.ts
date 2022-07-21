import { IUser } from '../interface/interface.user';
import Wallet from '../models/Wallet';

class HelpSearchUserWallet {
  static async searchUserWallet(id:number): Promise<IUser> {
    const result = await Wallet.findOne({ where: { user_id: id } });
    return result?.toJSON() as IUser;
  }
}

export default HelpSearchUserWallet.searchUserWallet;
