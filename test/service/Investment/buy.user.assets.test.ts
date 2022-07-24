import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import InvestimentSale from '../../../src/service/Investment/sale.user.assets';
import GetUserAssets from '../../../src/service/User/get.assets';
import { StatusCodes } from 'http-status-codes';
import InvestimentBuy from '../../../src/service/Investment/buy.user.assets';

const { expect } = chai;

describe('Teste de Service - Testando a Compra de Ativos >>> ', () => {
  const userTest = {
    id: 1,
    name: 'Pedro Jorge',
    Assets: [
      {
        id: 1,
        name: 'AAPL',
        quantity: 4,
        price: 322.32,
      },
      {
        id: 2,
        name: "MGLU3",
        quantity: 2,
        price: 5.78,
      },
    ],
  };

  beforeAll(async () => {
    await shell.exec(restoreDatabase);
  });

  afterEach(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Se é possivel comprar os ativos do usuário', async () => {
    const user = await GetUserAssets.getAssets(1);
    expect(user.Assets).to.be.length(2);

    await InvestimentBuy.buyAssets(1, 1, 2);

    const sale = await GetUserAssets.getAssets(1);
    expect(sale.Assets).to.be.length(2);
    expect(sale).to.deep.equal(userTest);
  });

  it('Se é possivel comprar ativos sem poder pagar', async () => {
    const saleErro = await InvestimentBuy.buyAssets(1, 1, 20);

    expect(saleErro).to.deep.equal({
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: 'Você não possui dinheiro o suficiente para completar a transação',
      },
    });
  });
});
