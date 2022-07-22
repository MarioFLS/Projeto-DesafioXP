import chai from 'chai';
import jwt from 'jsonwebtoken';
const shell = require('shelljs');
import UserUpdate from '../../../src/service/User/update.user';
import { restoreDatabase } from '../../helpers/comand';
import User from '../../../src/models/User';
import { userfake } from '../../helpers/mock.format.user';

const { expect } = chai;

describe('Testando atualização do Usuário Usuário >>> ', () => {
  const fake = userfake;

  beforeEach(async () => {
    await shell.exec(restoreDatabase);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Testando se é possível atualizar o usuário', async () => {
    const response = await UserUpdate(userfake, 2);
    const user = await User.findOne({ where: { email: fake.email, id:2 } });
    const result = user?.toJSON();

    
    expect(result).to.be.deep.contain(userfake)
    
    const verifyJwt = jwt.verify(
      response,
      process.env.SECRET_PASSWORD as string
    );
    expect(verifyJwt).to.deep.contains.keys('id', 'name', 'email');
  });
});
