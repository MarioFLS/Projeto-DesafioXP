import { StatusCodes } from 'http-status-codes';
import { IError } from '../../interface/interface.error';
import User from '../../models/User';

class DeleteUser {
  static async delete(email:string, password:string):
    Promise<number | IError> {
    if (!password) {
      return {
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: 'Senha não inserida',
        },
      };
    }
    const deleteUser = await User.destroy({ where: { email, password } });
    if (!deleteUser) {
      return {
        error: {
          code: StatusCodes.UNAUTHORIZED,
          message: 'Senha não corresponde ao usuário, tente novamente',
        },
      };
    }
    return deleteUser;
  }
}

export default DeleteUser.delete;
