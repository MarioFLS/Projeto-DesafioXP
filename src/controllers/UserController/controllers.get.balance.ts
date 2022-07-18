import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import GetBalance from '../../service/UserService/get.balance';

class UserBalance {
  static async getBalance(req:Request, res:Response, next:NextFunction)
  : Promise<Response | void > {
    const { id } = req.params;
    const wallet = await GetBalance.getBalance(Number(id));
    const { error } = wallet as IError;
    if (error) return next(wallet);
    return res.status(StatusCodes.OK).json(wallet);
  }
}

export default UserBalance;
