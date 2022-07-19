import { IUser } from '../interface/interface.user';
import SearchUserWallet from './search.database.user';

class Balance {
  private _id:number;
  private _valor:number;
  private _wallet: Promise<IUser>;

  constructor(id: number, valor: number) {
    this._id = id;
    this._valor = valor;
    this._wallet = SearchUserWallet(this._id);
  }

  async sum(): Promise<number> {
    const { balance } = await this._wallet;
    console.log(balance);
    return Number(balance) + this._valor;
  }
}

export default Balance;
