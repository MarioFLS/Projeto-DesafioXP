import express from 'express';
import CreateClient from '../controllers/UserController/controllers.create.client';
import UserBalance from '../controllers/UserController/controllers.get.balance';
import UserDeposit from '../controllers/UserController/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';
import ClientLogin from '../controllers/UserController/controllers.login.client';
import ClientUpdate from '../controllers/UserController/controllers.update.client';
import validateBalance from '../middleware/validate.balance';

const clienteRoute = express.Router();

clienteRoute.post('/create', CreateClient.create);
clienteRoute.post('/login', ClientLogin.login);
clienteRoute.put('/up', TokenValidate, ClientUpdate.update);

clienteRoute.get('/conta', TokenValidate, UserBalance.getBalance);
clienteRoute.post(
  '/conta/deposito',
  TokenValidate,
  validateBalance,
  UserDeposit.setBalance,
);
clienteRoute.post('/conta/saque', TokenValidate, validateBalance, UserDeposit.setBalance);

export default clienteRoute;
