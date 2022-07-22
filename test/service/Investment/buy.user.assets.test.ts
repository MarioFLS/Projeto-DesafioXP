import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import InvestimentSale from '../../../src/service/Investment/sale.user.assets';
import GetAssets from '../../../src/service/User/get.assets';
import { StatusCodes } from 'http-status-codes';
import InvestimentBuy from '../../../src/service/Investment/buy.user.assets';

const { expect } = chai;

describe('Teste de Service - Testando a Compra de Ativos >>> ', () => {
  const userTest = {
    id: 1,
    name: 'Pedro Jorge',
    Assets: [
      { amount: 322.32, id: 1, quantity: 4 },
      { amount: 5.78, id: 2, quantity: 2 },
    ],
  };

  beforeAll(async () => {
    await shell.exec(restoreDatabase);
  });

  afterEach(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Se é possivel comprar os ativos do usuário', async () => {
    const user = await GetAssets.getAssets(1);
    expect(user.Assets).to.be.length(2);

    await InvestimentBuy.buyAssets(1, 1, 2);

    const sale = await GetAssets.getAssets(1);
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
