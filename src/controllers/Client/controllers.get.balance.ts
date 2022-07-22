import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../interface/interface.user';
import GetBalance from '../../service/User/get.balance';

class ClientBalance {
  static async getBalance({ id, name }:Usertoken, _req:Request, res:Response)
  : Promise<Response | void > {
    const wallet = await GetBalance.getBalance(Number(id), name);
    return res.status(StatusCodes.OK).json(wallet);
  }
}

export default ClientBalance;
