import Sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ClientBalance from '../../../src/controllers/Client/controllers.get.balance';
import { Usertoken } from '../../../src/interface/interface.user';
import CreateUser from '../../../src/service/User/create.user';

const { expect } = chai;
chai.use(sinonChai);

const token = 'token100seguro';
const tokenDecode = { id: 1, name: 'fakeUser' } as Usertoken;

describe('Teste de Controllers - Testando Criar um Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(CreateUser, 'createUser').resolves(token);
  });

  it('Testando Sucesso no Login', async () => {
    await ClientBalance.getBalance(tokenDecode, req, res);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
  });
});

