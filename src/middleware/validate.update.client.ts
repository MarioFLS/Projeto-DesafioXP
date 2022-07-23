import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';
import { Usertoken } from '../interface/interface.user';

const requiredItemString = joi.string().not().empty().required();

class ValidateUpdate {
  static validateUpdate(token:Usertoken, req: Request, res: Response, next: NextFunction):
      Response | void {
    const { password, name } = req.body;
    const loginValidation = joi.object({
      name: requiredItemString.min(6),
      password: joi.string().min(6),
    })
      .messages({
        'any.required': 'Insira seus dados corretamente',
        'string.min': 'Seu nome deve ter mais que 6 digitos',
        'string.empty': 'Está faltando algum dado, de uma olhada se você possui name, '
            + 'email, password',
      });

    const { error } = loginValidation.validate({ password, name });
    const type = error?.details[0].context?.key;
    if (error) {
      if (type === 'password') {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Sua senha deve ser maior ou igual a 6 digitos' });
      }
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.details[0].message });
    }
    return next(token);
  }
}

export default ValidateUpdate.validateUpdate;
