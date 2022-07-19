import { StatusCodes } from 'http-status-codes';
import { IUser } from '../interface/interface.user';
import SearchUserWallet from './search.database.user';
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
    return Number(balance) + this._valor;
  }

  async withdraw(): Promise<number | IError> {
    const { balance } = await this._wallet;
    const subtraction = balance - this._valor;
    if (subtraction < 0) {
      return subtraction;
    }
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Seu email ou senha estão incorretos.',
      },
    };
  }
}

export default Balance;
