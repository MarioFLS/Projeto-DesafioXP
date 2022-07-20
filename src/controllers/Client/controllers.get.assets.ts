import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { Usertoken } from '../../interface/interface.user';
import GetAssets from '../../service/User/get.assets';

class ClientAssets {
  static async getAssets({ id }:Usertoken, _req:Request, res:Response, next:NextFunction)
  : Promise<Response | void > {
    const wallet = await GetAssets.getAssets(id);
    const { error } = wallet as IError;
    if (error) return next(wallet);
    return res.status(StatusCodes.OK).json(wallet);
  }
}

export default ClientAssets;
