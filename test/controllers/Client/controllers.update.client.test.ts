import Sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../../src/interface/interface.user';
import UserUpdate from '../../../src/service/User/update.user';
import ClientUpdate from '../../../src/controllers/Client/controllers.update.client';

const { expect } = chai;
chai.use(sinonChai);

const token = 'token100seguro';
const tokenDecode = { id: 1 } as Usertoken;

describe('Teste de Controllers - Testando Atualizar o Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;
  const _next = Sinon.stub().returns({ error: {} }) as NextFunction;

  beforeEach(() => {
    req.body = 'Nome Muito Falso'
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();

    Sinon.stub(UserUpdate, 'userUpdate').resolves(token);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Testando Sucesso no Update', async () => {
    await ClientUpdate.update(tokenDecode, req, res, _next);

    expect(res.status).to.have.been.calledWith(StatusCodes.OK);
  });
});
