import express from 'express';
import CreateClient from '../controllers/ClientController/controllers.create.client';
import UserBalance from '../controllers/ClientController/controllers.get.balance';
import UserDeposit from '../controllers/ClientController/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';
import ClientLogin from '../controllers/ClientController/controllers.login.client';
import ClientUpdate from '../controllers/ClientController/controllers.update.client';
import validateBalance from '../middleware/validate.balance';
import validateLogin from '../middleware/validate.login';
import validateNewUser from '../middleware/validate.new.user';
import ValidateUpdate from '../middleware/validate.update.client';

const clienteRoute = express.Router();

clienteRoute.post('/create', validateNewUser, CreateClient.create);
clienteRoute.put('/update', TokenValidate, ValidateUpdate, ClientUpdate.update);
clienteRoute.post('/login', validateLogin, ClientLogin.login);

clienteRoute.get('/conta', TokenValidate, UserBalance.getBalance);
clienteRoute.post(
  '/conta/deposito',
  TokenValidate,
  validateBalance,
  UserDeposit.setBalance,
);
clienteRoute.post('/conta/saque', TokenValidate, validateBalance, UserDeposit.setBalance);

export default clienteRoute;
