import express from 'express';
import CreateClient from '../controllers/Client/controllers.create.client';
import ClientBalance from '../controllers/Client/controllers.get.balance';
import ClientDeposit from '../controllers/Client/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';
import ClientLogin from '../controllers/Client/controllers.login.client';
import ClientUpdate from '../controllers/Client/controllers.update.client';
import validateBalance from '../middleware/validate.balance';
import validateLogin from '../middleware/validate.login';
import validateNewUser from '../middleware/validate.new.user';
import ValidateUpdate from '../middleware/validate.update.client';
import ClientAssets from '../controllers/Client/controllers.get.assets';
import DeleteClient from '../controllers/Client/controllers.delete.client';
import ClientHistory from '../controllers/Client/controllers.get.client.history';

const clienteRoute = express.Router();

clienteRoute.delete('/delete', TokenValidate, DeleteClient.delete);
clienteRoute.post('/create', validateNewUser, CreateClient.create);
clienteRoute.put('/update', TokenValidate, ValidateUpdate, ClientUpdate.update);
clienteRoute.post('/login', validateLogin, ClientLogin.login);

clienteRoute.get('/conta', TokenValidate, ClientBalance.getBalance);
clienteRoute.get('/ativos', TokenValidate, ClientAssets.getAssets);
clienteRoute.get('/log', TokenValidate, ClientHistory.history);

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
