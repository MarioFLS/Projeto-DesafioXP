import chai from 'chai';
import shell from 'shelljs';
import { restoreDatabase } from '../../helpers/comand';
import SetBalance from '../../../src/service/User/set.balance';
import Wallet from '../../../src/models/Wallet';

const { expect } = chai;

describe('Teste de Service - Testando o saldo do usuário >>> ', () => {
  beforeAll(async () => {
    await shell.exec(restoreDatabase);
  });

  afterAll(async () => {
    await shell.exec(restoreDatabase);
  });

  it('Caso ele faça um deposito', async () => {
    const wallet = await Wallet.findOne({where:{userId:1}});
    const sum = Number(wallet?.getDataValue('balance')) + 200;
    await SetBalance.setBalance(1, 200, 'deposit');
    
    const newWallet = await Wallet.findOne({where:{userId:1}})
    const value = Number(newWallet?.getDataValue('balance'))

    expect(value).to.be.equal(sum);
  });

  it('Caso ele faça um saque', async () => {
    const wallet = await Wallet.findOne({where:{userId:1}});
    const subtract = Number(wallet?.getDataValue('balance')) - 200;
    await SetBalance.setBalance(1, 200, 'withdraw');
    
    const newWallet = await Wallet.findOne({where:{userId:1}})
    const value = Number(newWallet?.getDataValue('balance'))

    expect(value).to.be.equal(subtract);
  });
});
