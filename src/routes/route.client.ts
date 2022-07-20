import express from 'express';
import CreateClient from '../controllers/ClientController/controllers.create.client';
import ClientBalance from '../controllers/ClientController/controllers.get.balance';
import ClientDeposit from '../controllers/ClientController/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';
import ClientLogin from '../controllers/ClientController/controllers.login.client';
import ClientUpdate from '../controllers/ClientController/controllers.update.client';
import validateBalance from '../middleware/validate.balance';
import validateLogin from '../middleware/validate.login';
import validateNewUser from '../middleware/validate.new.user';
import ValidateUpdate from '../middleware/validate.update.client';
import ClientAssets from '../controllers/ClientController/controllers.get.assets';

const clienteRoute = express.Router();

clienteRoute.post('/create', validateNewUser, CreateClient.create);
clienteRoute.put('/update', TokenValidate, ValidateUpdate, ClientUpdate.update);
clienteRoute.post('/login', validateLogin, ClientLogin.login);

clienteRoute.get('/conta', TokenValidate, ClientBalance.getBalance);
clienteRoute.get('/ativos', TokenValidate, ClientAssets.getAssets);

clienteRoute.post(
  '/conta/deposito',
  TokenValidate,
  validateBalance,
  ClientDeposit.setBalance,
);
clienteRoute.post(
  '/conta/saque',
  TokenValidate,
  validateBalance,
  ClientDeposit.setBalance,
);

export default clienteRoute;
