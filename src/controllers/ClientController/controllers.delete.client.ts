import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import deleteUser from '../../service/UserService/delete.user';
import { Usertoken } from '../../interface/interface.user';

class DeleteClient {
  static async delete({ email }:Usertoken, req:Request, res:Response, next:NextFunction)
  : Promise<Response | void> {
    const { password } = req.body;
    const user = await deleteUser(email, password);
    const { error } = user as IError;
    if (error) return next(user);
    return res.status(StatusCodes.NO_CONTENT).json({ message: 'O usuário foi deletado' });
  }
}

export default DeleteClient;
