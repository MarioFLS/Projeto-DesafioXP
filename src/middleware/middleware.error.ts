import { Request, Response, NextFunction } from 'express';
import { IError } from '../interface/interface.error';

class Error {
  static error(err: IError, _req: Request, res: Response, _next: NextFunction): Response {
    const { error } = err;
    if (error) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({
      message:
        'Tivemos um erro Interno, aguarde um tempo e recarregue a página!',
    });
  }
}

export default Error.error;
