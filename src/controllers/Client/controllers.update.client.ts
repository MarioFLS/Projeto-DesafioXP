import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INewUser, Usertoken } from '../../interface/interface.user';
import UserUpdate from '../../service/User/update.user';

class ClientUpdate {
  static async update({ id, email }:
    Usertoken, req:Request, res:Response, _next:NextFunction)
  : Promise<Response> {
    const { name, password } = req.body;
    const user = { name, password, email } as INewUser;
    const token = await UserUpdate.userUpdate(user, id);
    return res.status(StatusCodes.OK).json({ token });
  }
}

export default ClientUpdate;
