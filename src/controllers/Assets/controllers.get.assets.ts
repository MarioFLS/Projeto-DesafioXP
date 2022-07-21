import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import GetAssets from '../../service/Assets/get.assets';

class Assets {
  static async getAssets(req:Request, res:Response, next:NextFunction)
  : Promise<Response | void> {
    const { id } = req.params;
    const assets = new GetAssets();
    if (id) {
      const getType = Number(id);
      const assetId = await assets.assetId(getType);
      const { error } = assetId as IError;
      if (error) return next(assetId);
      return res.status(StatusCodes.OK).json(assetId);
    }
    return res.status(StatusCodes.OK).json(await assets.allAssets());
  }
}

export default Assets;
