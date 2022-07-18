import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';

const secret = process.env.SECRET_PASSWORD as string;

class TokenValidate {
  static tokenValidate(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers as { authorization: string };
    const { id } = req.params as { id: string };
    if (!authorization) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: 'Você precisa inserir um token para seguir adiante.',
        });
    }
    try {
      const token = jwt.verify(authorization, secret) as {id:number};
      if (token.id !== Number(id)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message:
            'Você está tentando fazer deposito na conta errada. Cheque seu ID',
        });
      }
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message:
          'Você está tentando usar um token inválido',
      });
    }

    return next();
  }
}

export default TokenValidate.tokenValidate;
