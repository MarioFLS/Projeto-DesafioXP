import Sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../../src/interface/interface.user';
import GetAssets from '../../../src/service/User/get.assets';
import ClientAssets from '../../../src/controllers/Client/controllers.get.assets';

const { expect } = chai;
chai.use(sinonChai);

const tokenDecode = { name: 'Fake Pedro', email: 'fakeEmail@pedro.com' } as Usertoken;
const result = {
  id: 1,
  name: 'Pedro Jorge',
  Assets: [
    {
      id: 1,
      quantity: 2,
      amount: 161.16,
    },
    {
      id: 2,
      quantity: 2,
      amount: 5.78,
    },
  ],
};

describe('Teste de Controllers - Testando Pegar os ativos do Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;
  const _next = Sinon.stub().returns({ error: {} }) as NextFunction;

  beforeEach(() => {
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(GetAssets, 'getAssets').resolves(result);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Pegando os ativos', async () => {
    await ClientAssets.getAssets(tokenDecode, req, res, _next);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
    expect(res.json).to.have.been.calledWith(result);
  });
});
