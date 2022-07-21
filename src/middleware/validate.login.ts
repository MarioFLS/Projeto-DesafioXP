import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';

const requiredItemString = joi.string().not().empty().required();

class ValidateLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction):
      Response | void {
    const { email, password } = req.body;
    const loginValidation = joi.object({
      email: requiredItemString,
      password: requiredItemString,
    })
      .messages({
        'any.required': 'Insira seus dados corretamente',
        'string.empty': 'Preencha corretamente o email e senha',
        'number.base': 'Insira um Saldo Válido',
      });

    const { error } = loginValidation.validate({ email, password });
    if (error) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.details[0].message });
    }
    return next();
  }
}

export default ValidateLogin.validateLogin;
