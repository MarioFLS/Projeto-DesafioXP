import { Request, Response } from 'express';
import { IError } from '../interface/interface.error';
import UserModel from '../service/service.user';

class User {
  static async getBalance(req:Request, res:Response): Promise<Response> {
    const { id } = req.params;
    const wallet = await UserModel.getBalance(Number(id));
    const { error } = wallet as IError;
    if (error) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(200).json(wallet);
  }
}

export default User;
