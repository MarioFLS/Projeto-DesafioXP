import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import UserLogin from '../../service/UserService/login.user';

class ClientLogin {
  static async login(req:Request, res:Response, next:NextFunction)
  : Promise<Response | void> {
    const { email, password } = req.body;
    const login = await UserLogin.login(email, password);
    const { error } = login as IError;
    if (error) { return next(login); }
    return res.status(StatusCodes.OK).json({ token: login });
  }
}

export default ClientLogin;
