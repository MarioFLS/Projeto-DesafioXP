import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';
import { Usertoken } from '../interface/interface.user';

class ValidateBalance {
  static validateBalance(
    token: Usertoken,
    req: Request,
    res: Response,
    next: NextFunction,
  ):
      Response | void {
    const { valor } = req.body;
    const valorValidation = joi.object({ valor: joi.number().not().empty().required() })
      .messages({
        'any.required': 'Insira um valor para que possa realizar a transação',
        'number.base': 'Insira um valor valido',
      });

    const { error } = valorValidation.validate({ valor });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }
    return next(token);
  }
}

export default ValidateBalance.validateBalance;
