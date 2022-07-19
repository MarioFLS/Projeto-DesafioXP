import { IUserBalance } from '../interface/interface.user';
import Wallet from '../models/Wallet';

class SearchUserWallet {
  static async searchUserWallet(id:number): Promise<IUserBalance> {
    const result = await Wallet.findOne({ where: { user_id: id } });
    return result?.toJSON() as IUserBalance;
  }
}

export default SearchUserWallet.searchUserWallet;
