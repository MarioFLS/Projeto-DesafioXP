import { StatusCodes } from 'http-status-codes';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IError } from '../../interface/interface.error';
import User from '../../models/User';

class UserLogin {
  static async login(email:string, password:string): Promise<String | IError> {
    const secret = process.env.SECRET_PASSWORD as string;
    const result = await User.findOne({ where: { email, password } });
    if (!result) {
      return {
        error: {
          code: StatusCodes.FORBIDDEN,
          message: 'Seu email ou senha estão incorretos.',
        },
      };
    }
    const { id, name } = result.toJSON();
    const payload = { id, name, admin: false };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return token;
  }
}

export default UserLogin;
