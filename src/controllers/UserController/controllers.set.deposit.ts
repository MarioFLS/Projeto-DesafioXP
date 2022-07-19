import console from 'console';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { token } from '../../interface/interface.user';
import SetDeposit from '../../service/UserService/set.deposit';

class UserDeposit {
  static async setDeposit({ id, name }:token, req:Request, res:Response, next:Function)
  : Promise<Response> {
    const { valor } = req.body;
    console.log(id, name);
    const balance = await SetDeposit.setDeposit(Number(id), valor);
    const { error } = balance as IError;
    if (error) { return next(balance); }
    return res.status(StatusCodes.OK).json({ id, name, saldo: balance });
  }
}

export default UserDeposit;
