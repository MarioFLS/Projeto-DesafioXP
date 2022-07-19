import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import { Usertoken } from '../../interface/interface.user';
import UserUpdate from '../../service/UserService/update.user';

class ClientUpdate {
  static async update({ id }:Usertoken, req:Request, res:Response, next:Function)
  : Promise<Response> {
    const token = await UserUpdate(req.body, id);
    const { error } = token as IError;
    if (error) { return next(token); }
    return res.status(StatusCodes.OK).json({ token });
  }
}

export default ClientUpdate;
