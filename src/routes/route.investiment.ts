import express from 'express';
import InvestimentBuy from '../controllers/Investment/controllers.investiment.buy';
import TokenValidate from '../middleware/validate.token';
import InvestimentSale from '../controllers/Investment/controllers.investiment.sale';
import ValidateInvestiment from '../middleware/middleware.investiment';

const investimentRoute = express.Router();

investimentRoute.post('/comprar', TokenValidate, ValidateInvestiment, InvestimentBuy.buy);
investimentRoute.post(
  '/vender',
  TokenValidate,
  ValidateInvestiment,
  InvestimentSale.sale,
);

export default investimentRoute;
