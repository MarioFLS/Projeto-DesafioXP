import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import CreateUser from '../../service/User/create.user';

class CreateClient {
  static async create(req:Request, res:Response, next:NextFunction)
  : Promise<Response | void> {
    const token = await CreateUser(req.body);
    const { error } = token as IError;
    if (error) return next(token);
    return res.status(StatusCodes.CREATED).json({ token });
  }
}

export default CreateClient;
