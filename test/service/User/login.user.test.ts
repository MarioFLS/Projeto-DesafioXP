import chai from 'chai';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import UserLogin from '../../../src/service/User/login.user';
import { StatusCodes } from 'http-status-codes';

const { expect } = chai;

describe("Teste de Login do Usuário >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", () => {
    it("Caso haja sucesso no Login", async () => {
        const response = await UserLogin.login('pedroJorge@gmail.com', '123456') as string;
        const verifyJwt = jwt.verify(response,  process.env.SECRET_PASSWORD as string);
        expect(verifyJwt).to.deep.contains.keys('id', 'name', 'email');
    });
    it("Caso haja erro no Login", async () => {
      const response = await UserLogin.login('usuario fake', 'senha fake') as string;
      expect(response).to.deep.equal({"error": {
        "code": StatusCodes.FORBIDDEN,
        "message": "Seu email ou senha estão incorretos."
        }});
  })
})
