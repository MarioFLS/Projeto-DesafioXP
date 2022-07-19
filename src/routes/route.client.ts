import express from 'express';
import UserBalance from '../controllers/UserController/controllers.get.balance';
import UserLogin from '../controllers/UserController/controllers.login.user';
import UserDeposit from '../controllers/UserController/controllers.set.deposit';
import TokenValidate from '../middleware/validate.token';

const clienteRoute = express.Router();

clienteRoute.post('/conta/login', UserLogin.login);
clienteRoute.get('/conta', TokenValidate, UserBalance.getBalance);
clienteRoute.post('/conta/deposit', TokenValidate, UserDeposit.setDeposit);

export default clienteRoute;
