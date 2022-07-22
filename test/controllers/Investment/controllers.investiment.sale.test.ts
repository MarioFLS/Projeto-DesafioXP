import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import { StatusCodes } from 'http-status-codes';
import User from '../../../src/models/User';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const buy = { id: 1, quantity: 2 };
const login = { email: 'pedroJorge@gmail.com', password: '123456' };

describe('Teste de Controllers - Testando vender ativos do Cliente', () => {
  beforeAll(async () => shell.exec(restoreDatabase));

  afterAll(async () => shell.exec(restoreDatabase));

  it('Testando Sucesso na venda', async () => {
    const loginUser = await chai
      .request('http://localhost:3000')
      .post('/client/login')
      .send(login);
    
      const response = await chai
      .request('http://localhost:3000')
      .post('/investimentos/vender')
      .set('Authorization', loginUser.body.token)
      .send(buy);

    expect(response).to.have.status(StatusCodes.OK);
    expect(response.body).to.deep.equal({
      message: 'Ativo vendido com sucesso',
    });
  });

  it('Testando Sucesso na venda', async () => {
    const loginUser = await chai
      .request('http://localhost:3000')
      .post('/client/login')
      .send(login);
    

      const response = await chai
      .request('http://localhost:3000')
      .post('/investimentos/vender')
      .set('Authorization', loginUser.body.token)
      .send(buy);

    expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.deep.equal({
      message: 'Você não possui esse ativo para venda',
    });
  });
});
