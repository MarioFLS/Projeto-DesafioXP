import chai from 'chai';
import GetBalance from '../../../src/service/User/get.balance';

const { expect } = chai;

describe("Teste Da carteira do Usuário >>>  ", () => {
    it("Testando se a carteira do Cliente vem Correta", async () => {
        const response = await GetBalance.getBalance(1, 'Pedro Jorge');
        expect(response).to.deep.equal({ id: 1, name: 'Pedro Jorge', balance: '250.00' });
    });
    it("Caso não exista um usuário e ela retorne um erro", async () => {
      let getError: unknown | GetBalance;
      try {
        getError = await GetBalance.getBalance(166, 'fake');
      } catch (error) {
      getError = error;
      }
      expect(getError).to.be.an('error');
  })
})
