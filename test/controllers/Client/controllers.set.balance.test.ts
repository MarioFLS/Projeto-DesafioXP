import Sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import GetBalance from '../../../src/service/User/get.balance';
import ClientBalance from '../../../src/controllers/Client/controllers.get.balance';
import { Usertoken } from '../../../src/interface/interface.user';

const { expect } = chai;
chai.use(sinonChai);

const fakeWallet = { id: 1, name: 'fakeUser', balance: 3000 };
const tokenDecode = { id: 1, name: 'fakeUser' } as Usertoken;

describe('Teste de Controllers - Pegar a Carteira do Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = Sinon.stub().returns({ error: {} }) as NextFunction;

  beforeEach(() => {
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(GetBalance, 'getBalance').resolves(fakeWallet);
  });

  it('Testando Sucesso no Login', async () => {
    await ClientBalance.getBalance(tokenDecode, req, res, next);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
    expect(res.json).to.have.been.calledWith(fakeWallet);
  });
});

