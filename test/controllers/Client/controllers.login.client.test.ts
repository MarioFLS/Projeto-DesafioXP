import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ClientLogin from '../../../src/controllers/Client/controllers.login.client';
import UserLogin from '../../../src/service/User/login.user';

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const fakeUser = { email: 'Fake User', password: 'senhaMaisFakeAinda' };

const realUser = { email: 'pedroJorge@gmail.com', password: '123456' };

describe('Teste de Controllers - Logar como Cliente', () => {
  const token = 'tokenExtremamenteConfiavel';
  const req = {} as Request;
  const res = {} as Response;
  const next = Sinon.stub().returns({ error: {} }) as NextFunction;

  beforeEach(() => {
    req.body = fakeUser;
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(UserLogin, 'login').resolves(token);
  });

  it('Testando Sucesso no Login', async () => {
    await ClientLogin.login(req, res, next);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
    expect(res.json).to.have.been.calledWith({ token });
  });
});

describe('Teste de Controllers - Teste se o Token é seguro - Ele olha o proprio Banco de dados Para fazer a validação', () => {
  it('Testando SUCESSO', async () => {
    const response = await chai
      .request('http://localhost:3000')
      .post('/client/login')
      .send(realUser);
    expect(response).to.have.status(StatusCodes.OK);
  });

  it('Testando FALHA', async () => {
    const response = await chai
      .request('http://localhost:3000')
      .post('/client/login')
      .send(fakeUser);
    expect(response).to.have.status(StatusCodes.UNAUTHORIZED);
    expect(response.body).to.deep.equal({ message: 'Seu email ou senha estão incorretos.' });
  });
});
