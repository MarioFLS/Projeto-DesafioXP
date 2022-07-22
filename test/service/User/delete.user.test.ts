import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import User from '../../../src/models/User';
import DeleteUser from '../../../src/service/User/delete.user';

const { expect } = chai;

describe('Testando deletar um usuário >>> ', () => {
  beforeEach(async () => await shell.exec(restoreDatabase));

  afterEach(async () => await shell.exec(restoreDatabase));

  it('Testando se é possível deletar o usuário', async () => {
    const email = 'pedroJorge@gmail.com';
    const password = '123456';

    const userExists = await User.findOne({ where: { id: 1 } });
    expect(userExists?.toJSON()).to.be.deep.contain({email, password});

    await DeleteUser('pedroJorge@gmail.com', '123456');
    const userNotExists = await User.findOne({ where: { id: 1 } });
    expect(userNotExists).to.be.null;
  });
});
