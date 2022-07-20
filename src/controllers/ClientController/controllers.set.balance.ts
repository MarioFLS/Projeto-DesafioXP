import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { Usertoken } from '../../interface/interface.user';
import SetBalance from '../../service/UserService/set.balance';

class ClientDeposit {
  static async setBalance(
    { id, name }:Usertoken,
    req:Request,
    res:Response,
    next:NextFunction,
  )
  : Promise<Response | void> {
    const type = req.url.endsWith('deposito') ? 'deposit' : 'withdraw';
    const { valor } = req.body;

    const balance = await SetBalance.setBalance(Number(id), valor, type);

    const { error } = balance as IError;
    if (error) { return next(balance); }
    return res.status(StatusCodes.OK).json({ id, name, saldo: balance });
  }
}

export default ClientDeposit;
