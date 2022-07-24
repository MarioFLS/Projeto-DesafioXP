import express from 'express';
import Assets from '../controllers/Assets/controllers.get.assets';

const assetsRoute = express.Router();

/**
 * @swagger
 *  tags:
 *      name: Investimento
 *      description: Endpoints de investimentos
 */

assetsRoute.get('', Assets.getAssets);
/**
 * @swagger
 *  /investimentos/comprar:
 *    post:
 *      tags: [Investimento]
 *      description: Retorna o sucesso da compra do ativo
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
assetsRoute.get('/:id', Assets.getAssets);
/**
 * @swagger
 *  /investimentos/vender:
 *    post:
 *      tags: [Investimento]
 *      description: Retorna o sucesso da compra do ativo
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

export default assetsRoute;
