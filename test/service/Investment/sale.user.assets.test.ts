import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import InvestimentSale from '../../../src/service/Investment/sale.user.assets';
import GetAssets from '../../../src/service/User/get.assets';
import { StatusCodes } from 'http-status-codes';

const { expect } = chai;

describe('Teste de Service - Testando a venda de Ativos >>> ', () => {
  const userTest = {
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

  beforeAll(async () => {
    await shell.exec(restoreDatabase);
  });

  afterEach(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Se é possivel vender os ativos do usuário', async () => {
    const user = await GetAssets.getAssets(1);
    expect(user).to.deep.equal(userTest);
    expect(user.Assets).to.be.length(2);

    await InvestimentSale.saleAssets(1, 1, 2);

    const sale = await GetAssets.getAssets(1);
    expect(sale.Assets).to.be.length(1);
  });

  it('Se é possivel vender além do que você tem', async () => {
    const saleErro = await InvestimentSale.saleAssets(1, 1, 20);

    expect(saleErro).to.deep.equal({
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: 'Você não pode vender mais do que os ativos que tem.',
      },
    });
  });
});
