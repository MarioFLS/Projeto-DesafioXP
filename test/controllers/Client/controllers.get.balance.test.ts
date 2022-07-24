import Sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../../src/interface/interface.user';
import SetBalance from '../../../src/service/User/set.balance';
import ClientDeposit from '../../../src/controllers/Client/controllers.set.balance';

const { expect } = chai;
chai.use(sinonChai);

const tokenDecode = { id: 1, name: 'fakeUser' } as Usertoken;

describe('Teste de Controllers - Testado Deposito e Saque do Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = Sinon.stub().returns({ error: {} }) as NextFunction;

  beforeEach(() => {
    req.body = { valor: 2500 };
    req.url = 'saque'
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(SetBalance, 'setBalance').resolves(2700);
  });

  it('Testando Sucesso', async () => {
    await ClientDeposit.setBalance(tokenDecode, req, res, next);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
    expect(res.json).to.have.been.calledWith({...tokenDecode,  balance: 2700 });
  });
});
