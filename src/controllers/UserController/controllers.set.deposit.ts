import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import SetDeposit from '../../service/UserService/set.deposit';

class UserDeposit {
  static async setDeposit(req:Request, res:Response, next:Function)
  : Promise<Response> {
    const { id, valor } = req.body;
    const wallet = await SetDeposit.setDeposit(+id, +valor);
    const { error } = wallet as IError;
    if (error) { return next(wallet); }
    return res.status(StatusCodes.OK).json(wallet);
  }
}

export default UserDeposit;
