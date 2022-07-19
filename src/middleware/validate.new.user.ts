import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import joi from 'joi';

const requiredItemString = joi.string().not().empty().required();

class ValidateLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction):
      Response | void {
    const {
      email, password, name, saldo,
    } = req.body;
    const loginValidation = joi.object({
      name: requiredItemString.min(6),
      email: requiredItemString.email(),
      password: requiredItemString.min(6),
      saldo: joi.number().not().empty().required()
        .min(100),
    })
      .messages({
        'any.required': 'Insira seus dados corretamente',
        'string.min': 'Seu nome deve ter mais que 6 digitos',
        'string.empty': 'Está faltando algum dado, de uma olhada se você possui name, '
            + 'email, password e saldo inicial',
        'string.email': 'Insira um email valido',
        'number.min': 'Seu saldo inicial deve ser superior a 100',
        'number.base': 'Insira um Saldo Válido, ele deve ser um Número',
      });

    const { error } = loginValidation.validate({
      email, password, name, saldo,
    });
    const type = error?.details[0].context?.key;
    if (error) {
      if (type === 'password') {
        return res.status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Sua senha deve ser maior ou igual a 6 digitos' });
      }
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.details[0].message });
    }
    return next();
  }
}

export default ValidateLogin.validateLogin;
