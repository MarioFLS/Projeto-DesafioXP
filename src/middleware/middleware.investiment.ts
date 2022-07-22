import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';

const requiredItemNumber = joi.number().not().empty().required()
  .min(1);

class ValidateInvestiment {
  static validateInvestiment(
    { id: userId }:{id:number},
    req: Request,
    res: Response,
    next: NextFunction,
  ):
      Response | void {
    const { id, quantity } = req.body;
    const loginValidation = joi.object({
      id: requiredItemNumber,
      quantity: requiredItemNumber,
    })
      .messages({
        'any.required': 'Insira seus dados corretamente',
        'number.base': 'Insira um Saldo Válido',
      });

    const { error } = loginValidation.validate({ id, quantity });
    if (error) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.details[0].message });
    }
    return next(userId);
  }
}

export default ValidateInvestiment.validateInvestiment;
