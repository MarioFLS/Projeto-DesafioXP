import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

const secret = process.env.SECRET_PASSWORD as string;

class TokenValidate {
  static tokenValidate(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: 'Você precisa inserir um token para seguir adiante.',
        });
    }
    try {
      const token = jwt.verify(authorization, secret) as {id:number};
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
