import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import UserLogin from '../../service/UserService/login.user';

class Login {
  static async login(req:Request, res:Response, next:Function)
  : Promise<Response> {
    const { email, password } = req.body;
    const login = await UserLogin.login(email, password);
    const { error } = login as IError;
    if (error) { return next(login); }
    return res.status(StatusCodes.OK).json({ token: login });
  }
}

export default Login;
