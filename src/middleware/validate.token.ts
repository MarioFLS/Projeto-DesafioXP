import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import UserClass from '../helpers/search.database.user';

const secret = process.env.SECRET_PASSWORD as string;

class TokenValidate {
  static async tokenValidate(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: 'Você precisa inserir um token para seguir adiante.',
        });
    }
    try {
      const token = jwt.verify(authorization, secret) as {id:number, email:string};
      const verifyUser = await new UserClass(token.email).user();
      if (!verifyUser) {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Esse token está expirado ou usário foi atualizado.' });
      }
      return next(token);
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message:
          'Você está tentando usar um token inválido ou expirado. Tente novamente',
      });
    }
  }
}

export default TokenValidate.tokenValidate;
