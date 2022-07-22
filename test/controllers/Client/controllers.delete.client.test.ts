import chai from 'chai';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Usertoken } from '../../../src/interface/interface.user';
import DeleteClient from '../../../src/controllers/Client/controllers.delete.client';
import DeleteUser from '../../../src/service/User/delete.user';

const { expect } = chai;
chai.use(sinonChai);

const tokenDecode = { email: 'fakeEmail@email.com' } as Usertoken;

describe('Teste de Controllers - Testando Deletar um Cliente', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = Sinon.stub().returns({ error: {} }) as NextFunction;
  beforeAll(async () => {
    await shell.exec(restoreDatabase);
    req.body = { pasword: 'fakeSenha' };
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().resolves();
    Sinon.stub(DeleteUser, 'delete').resolves(1)
    
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Testando Sucesso em deletar', async () => {
    await DeleteClient.delete(tokenDecode, req, res, next);

    expect(res.status).to.have.been.calledWith(StatusCodes.NO_CONTENT);
  });
});
