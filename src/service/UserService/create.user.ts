import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { IError } from '../../interface/interface.error';
import { INewUser } from '../../interface/interface.user';
import User from '../../models/User';
import Wallet from '../../models/Wallet';

class CreateUser {
  static async createUser(user:INewUser): Promise<String | IError> {
    const {
      name: userName, email, password, saldo,
    } = user;
    const secret = process.env.SECRET_PASSWORD as string;

    const create = await User.create({
      name: userName, email, password, active: true, subscriptionDate: Date.now(),
    });
    const id = create.null;
    const { name } = create.toJSON();
    await Wallet.create({ userId: id, balance: saldo });

    const payload = { id, name, admin: false };

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    return token;
  }
}

export default CreateUser.createUser;
