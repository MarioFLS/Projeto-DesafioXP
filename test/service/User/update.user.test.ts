import chai from 'chai';
import jwt from 'jsonwebtoken';
import shell from 'shelljs';
import UserUpdate from '../../../src/service/User/update.user';
import { restoreDatabase } from '../../helpers/comand';
import User from '../../../src/models/User';
import { INewUser } from '../../../src/interface/interface.user';

const { expect } = chai;

describe('Teste de Service - Testando atualização do Usuário Usuário >>> ', () => {
  beforeEach(async () => {
    await shell.exec(restoreDatabase);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Testando se é possível atualizar o usuário', async () => {
    const userUpdate = {
      name: 'novo Nome',
      email: 'pedroJorge@gmail.com',
    } as INewUser;
    const response = await UserUpdate.userUpdate(userUpdate, 1);
    const user = await User.findOne({ where: { id: 1 } });
    const result = user?.toJSON();

    expect(result.name).to.be.equal(userUpdate.name);

    const verifyJwt = jwt.verify(
      response,
      process.env.SECRET_PASSWORD as string
    );
    expect(verifyJwt).to.deep.contains.keys('id', 'name', 'email');
  });
});
