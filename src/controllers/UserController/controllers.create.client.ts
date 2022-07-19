import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateUser from '../../service/UserService/create.user';

class CreateClient {
  static async create(req:Request, res:Response, next:Function)
  : Promise<Response> {
    const token = await CreateUser(req.body);
    return res.status(StatusCodes.OK).json({ token });
  }
}

export default CreateClient;
