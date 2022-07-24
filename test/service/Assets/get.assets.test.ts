import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import GetAssets from '../../../src/service/Assets/get.assets';
import { StatusCodes } from 'http-status-codes';

const { expect } = chai;

describe('Teste de Service - Testando rota para pegar todos ativos ou pelo seu id >>> ', () => {
  beforeAll(async () => await shell.exec(restoreDatabase));
  it('Testando Pegar Todos os Assets', async () => {
    const response = await new GetAssets().allAssets();

    response.forEach((asset) => {
      expect(asset.toJSON()).to.deep.contains.keys(
        'id',
        'name',
        'company',
        'quantity',
        'price'
      );
    })

    
  });

  it('Verificando os assets  de ID 2', async () => {
    const response = await new GetAssets().assetId(1);

    expect(response).to.deep.equal({
      quantity: 653,
      company: 'Apple',
      id: 1,
      name: 'AAPL',
      price: '80.58',
    });
  });

  it('Verificando os assets  de ID Inexistente', async () => {
    const response = await new GetAssets().assetId(999);

    expect(response).to.deep.equal({
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'Não existe ativo com esse ID',
      },
    });
  });
});
