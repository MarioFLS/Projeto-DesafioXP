import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../interface/interface.user';
import UserUpdate from '../../service/User/update.user';

class ClientUpdate {
  static async update({ id }:Usertoken, req:Request, res:Response, _next:NextFunction)
  : Promise<Response> {
    const token = await UserUpdate(req.body, id);
    return res.status(StatusCodes.OK).json({ token });
  }
}

export default ClientUpdate;
