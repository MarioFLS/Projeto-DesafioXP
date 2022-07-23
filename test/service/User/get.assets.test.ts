import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import GetAssets from '../../../src/service/User/get.assets';

const { expect } = chai;

describe('Teste de Service - Testando os Assets do Usuário >>> ', () => {
  beforeAll(async () => await shell.exec(restoreDatabase));
  it('Verificando os assets do usuário de ID 1', async () => {
    const user1 = {
      id: 1,
      name: 'Pedro Jorge',
      Assets: [
        {
          id: 1,
          name: 'AAPL',
          quantity: 2,
          amount: 161.16,
        },
        {
          id: 2,
          name: "MGLU3",
          quantity: 2,
          amount: 5.78,
        },
      ],
    };
    const response = await GetAssets.getAssets(1);

    expect(response).to.deep.equal(user1);
  });

  it('Verificando os assets do usuário de ID 2', async () => {
    const user2 = {
      id: 2,
      name: 'Jorge Pedro',
      Assets: [],
    };
    const response = await GetAssets.getAssets(2);

    expect(response).to.deep.equal(user2);
  });
});
