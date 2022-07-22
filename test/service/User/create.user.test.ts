import chai from 'chai';
import shell from 'shelljs';
import jwt from 'jsonwebtoken';
import { restoreDatabase } from '../../helpers/comand';
import { userfake } from '../../helpers/mock.format.user';
import CreateUser from '../../../src/service/User/create.user';
import { INewUser } from '../../../src/interface/interface.user';
import User from '../../../src/models/User';
import { StatusCodes } from 'http-status-codes';

const { expect } = chai;

describe('Teste de Service - Testando se é possivel criar um Usuário >>> ', () => {
  beforeAll(async () => {
    await shell.exec(restoreDatabase);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Criando um falso usuário', async () => {
    const newFakeUser = { ...userfake, saldo: 100 } as INewUser;
    const response = (await CreateUser(newFakeUser)) as string;
    const verifyJwt = jwt.verify(
      response,
      process.env.SECRET_PASSWORD as string
    );
    expect(verifyJwt).to.deep.contains.keys('id', 'name', 'email');
    const { id } = verifyJwt as { id: number };

    const user = await User.findOne({ where: { id } });
    expect(user?.toJSON()).to.deep.contains({ email: newFakeUser.email, id });
  });

  it('Esperando erro ao criar um usuário que já existe', async () => {
    const newFakeUser = { ...userfake, saldo: 100 } as INewUser;
    const response = (await CreateUser(newFakeUser)) as string;

    expect(response).to.deep.equal({
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: 'Esse email de usuário já possui conta! Tente outro!',
      },
    });
  });
});
