import express from 'express';
import InvestimentBuy from '../controllers/Investment/controllers.investiment.buy';
import TokenValidate from '../middleware/validate.token';
import InvestimentSale from '../controllers/Investment/controllers.investiment.sale';
import ValidateInvestiment from '../middleware/middleware.investiment';

const investimentRoute = express.Router();

/**
 * @swagger
 *  tags:
 *      name: Investimento
 *      description: Endpoints de investimentos
 */

investimentRoute.post('/comprar', TokenValidate, ValidateInvestiment, InvestimentBuy.buy);
/**
 * @swagger
 *  /investimentos/comprar:
 *    post:
 *      tags: [Investimento]
 *      description: Retorna o sucesso da compra do ativo
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  quantity:
 *                    type: integer
 *                    example: 2
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Ativo adquirido com sucesso
 */
investimentRoute.post(
  '/vender',
  TokenValidate,
  ValidateInvestiment,
  InvestimentSale.sale,
);
/**
 * @swagger
 *  /investimentos/vender:
 *    post:
 *      tags: [Investimento]
 *      description: Retorna o sucesso ma venda do ativo
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  quantity:
 *                    type: integer
 *                    example: 2
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Ativo vendido com sucesso
 */

export default investimentRoute;
