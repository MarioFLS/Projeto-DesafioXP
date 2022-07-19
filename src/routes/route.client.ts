import express from 'express';
import CreateClient from '../controllers/UserController/controllers.create.user';
import UserBalance from '../controllers/UserController/controllers.get.balance';
import UserLogin from '../controllers/UserController/controllers.login.user';
import UserDeposit from '../controllers/UserController/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';

const clienteRoute = express.Router();

clienteRoute.post('/create', CreateClient.create);
clienteRoute.post('/login', UserLogin.login);
clienteRoute.get('/conta', TokenValidate, UserBalance.getBalance);
clienteRoute.post('/conta/deposito', TokenValidate, UserDeposit.setBalance);
clienteRoute.post('/conta/saque', TokenValidate, UserDeposit.setBalance);

export default clienteRoute;
