import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import GetAssets from '../../service/Assets/get.assets';

class Assets {
  static async getAssets(_req:Request, res:Response)
  : Promise<Response> {
    console.log('a');
    const assets = await new GetAssets().allAssets();
    console.log(assets);
    return res.status(StatusCodes.OK).json(assets);
  }
}

export default Assets;
