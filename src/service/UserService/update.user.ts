import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { IError } from '../../interface/interface.error';
import { INewUser } from '../../interface/interface.user';
import User from '../../models/User';

class UserUpdate {
  static async userUpdate(user:INewUser, param:number): Promise<string | IError | any> {
    const secret = process.env.SECRET_PASSWORD as string;
    const { name } = user;
    const result = await User.update(user, { where: { id: param } });
    if (!result[0]) {
      return {
        error: {
          code: StatusCodes.NOT_MODIFIED,
          message: 'Alguma coisa deu errado na atualização do seu User. Tente novamente!',
        },
      };
    }

    const payload = { id: param, name, admin: false };

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return token;
  }
}

export default UserUpdate.userUpdate;
