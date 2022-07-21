import express from 'express';
import InvestimentBuy from '../controllers/Investment/controllers.investiment.buy';
import TokenValidate from '../middleware/validate.token';
import InvestimentSale from '../controllers/Investment/controllers.investiment.sale';

const investimentRoute = express.Router();

investimentRoute.post('/comprar', TokenValidate, InvestimentBuy.buy);
investimentRoute.post('/vender', TokenValidate, InvestimentSale.sale);

export default investimentRoute;
