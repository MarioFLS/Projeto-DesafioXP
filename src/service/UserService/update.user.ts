import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IError } from '../../interface/interface.error';
import { INewUser } from '../../interface/interface.user';
import User from '../../models/User';

class UserUpdate {
  static async userUpdate(user:INewUser, param:number): Promise<string | IError | any> {
    const secret = process.env.SECRET_PASSWORD as string;
    const { name } = user;
    await User.update(user, { where: { id: param } });

    const payload = { id: param, name, admin: false };

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return token;
  }
}

export default UserUpdate.userUpdate;
