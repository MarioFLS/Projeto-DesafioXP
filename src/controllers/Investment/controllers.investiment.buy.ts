import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import InvestmentBuy from '../../service/Investment/buy.user.assets';

class InvestimentBuy {
  static async buy(userId:number, req:Request, res:Response, next:NextFunction)
  : Promise<Response | void> {
    const { id, quantity } = req.body;
    console.log(id);
    const investiment = await InvestmentBuy.buyAssets(userId, id, quantity);
    const { error } = investiment as IError;
    if (error) { return next(investiment); }
    return res.status(StatusCodes.OK).json({ message: 'Ativo adquirido com sucesso' });
  }
}

export default InvestimentBuy;
