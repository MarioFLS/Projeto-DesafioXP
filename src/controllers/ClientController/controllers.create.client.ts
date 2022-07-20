import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateUser from '../../service/UserService/create.user';

class CreateClient {
  static async create(req:Request, res:Response)
  : Promise<Response> {
    const token = await CreateUser(req.body);
    return res.status(StatusCodes.CREATED).json({ token });
  }
}

export default CreateClient;
