import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { Usertoken } from '../../interface/interface.user';
import GetBalance from '../../service/User/get.balance';

class ClientBalance {
  static async getBalance(
    { id, name }:Usertoken,
    _req:Request,
    res:Response,
    next:NextFunction,
  )
  : Promise<Response | void > {
    const wallet = await GetBalance.getBalance(Number(id), name);
    const { error } = wallet as IError;
    if (error) return next(wallet);
    return res.status(StatusCodes.OK).json(wallet);
  }
}

export default ClientBalance;
