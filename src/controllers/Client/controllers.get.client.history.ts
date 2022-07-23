import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserHistory from '../../service/User/get.user.history';

class ClientHistory {
  static async history({ id }:{id:number}, _req:Request, res:Response, _next:NextFunction)
  : Promise<Response> {
    const history = await UserHistory.history(id);
    return res.status(StatusCodes.OK).json(history);
  }
}

export default ClientHistory;
