import express from 'express';
import InvestimentBuy from '../controllers/Investment/controllers.investiment.buy';
import TokenValidate from '../middleware/validate.token';

const investimentRoute = express.Router();

investimentRoute.post('/comprar', TokenValidate, InvestimentBuy.buy);

export default investimentRoute;
