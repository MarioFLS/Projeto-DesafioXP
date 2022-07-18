import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserLogin from '../../service/UserService/login.user';

class Login {
  static async login(req:Request, res:Response, _next:Function)
  : Promise<Response> {
    const { email, password } = req.body;
    const token = await UserLogin.login(email, password);
    return res.status(StatusCodes.OK).json({ token });
  }
}

export default Login;
