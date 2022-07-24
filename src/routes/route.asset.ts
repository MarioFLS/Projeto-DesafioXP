import express from 'express';
import Assets from '../controllers/Assets/controllers.get.assets';

const assetsRoute = express.Router();
/**
 * @swagger
 *  tags:
 *      name: Ativos
 *      description: Endpoints de investimentos
 */
assetsRoute.get('', Assets.getAssets);
/**
 * @swagger
 *  /ativos:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna todos os ativos.
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: AAPL
 *                    company:
 *                      type: string
 *                      example: Apple
 *                    quantity:
 *                      type: integer
 *                      example: 653
 *                    price:
 *                      type: decimal
 *                      example: 80.58
 */

assetsRoute.get('/:id', Assets.getAssets);
/**
 * @swagger
 *  /ativos/{id}:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna o ativo pelo id.
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          requerid: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: AAPL
 *                  company:
 *                    type: string
 *                    example: Apple
 *                  quantity:
 *                    type: integer
 *                    example: 653
 *                  price:
 *                    type: decimal
 *                    example: 80.58
 */

export default assetsRoute;
