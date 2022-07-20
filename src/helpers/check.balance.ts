import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interface/interface.user';
import SearchUserWallet from './search.database.wallet';
import { IError } from '../interface/interface.error';

class Balance {
  private _id:number;
  private _valor:number;
  private _wallet: Promise<IUser>;

  constructor(id: number, valor: number) {
    this._id = id;
    this._valor = valor;
    this._wallet = SearchUserWallet(this._id);
  }

  async deposit(): Promise<number> {
    const { balance } = await this._wallet;
    const result = Number(balance) + this._valor;
    return Number(result.toFixed(2));
  }

  async withdraw(): Promise<number | IError> {
    const { balance } = await this._wallet;
    const subtraction = Number(balance) - this._valor;
    if (subtraction > 0) {
      return Number(subtraction.toFixed(2));
    }
    throw {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Você não tem dinheiro o suficiente',
      },
    };
  }
}

export default Balance;
