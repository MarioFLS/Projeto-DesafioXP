import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import InvestmentSale from '../../service/Investment/sale.user.assets';

class InvestimentSale {
  static async sale(
    { id: userId }:{id:number},
    req:Request,
    res:Response,
    next:NextFunction,
  )
  : Promise<Response | void> {
    const { id, quantity } = req.body;
    const investiment = await InvestmentSale.saleAssets(userId, id, quantity);

    const { error } = investiment as IError;
    if (error) { return next(investiment); }
    return res.status(StatusCodes.OK).json({ message: 'Ativo vendido com sucesso' });
  }
}

export default InvestimentSale;
