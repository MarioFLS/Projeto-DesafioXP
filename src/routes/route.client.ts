import express from 'express';
import CreateClient from '../controllers/Client/controllers.create.client';
import ClientBalance from '../controllers/Client/controllers.get.balance';
import ClientDeposit from '../controllers/Client/controllers.set.balance';
import TokenValidate from '../middleware/validate.token';
import ClientLogin from '../controllers/Client/controllers.login.client';
import ClientUpdate from '../controllers/Client/controllers.update.client';
import validateBalance from '../middleware/validate.balance';
import validateLogin from '../middleware/validate.login';
import validateNewUser from '../middleware/validate.new.user';
import ValidateUpdate from '../middleware/validate.update.client';
import ClientAssets from '../controllers/Client/controllers.get.assets';
import DeleteClient from '../controllers/Client/controllers.delete.client';
import ClientHistory from '../controllers/Client/controllers.get.client.history';

const clienteRoute = express.Router();

clienteRoute.post('/login', validateLogin, ClientLogin.login);

/**
 * @swagger
 *  tags:
 *      name: Client
 *      description: Endpoints do Ciente
 */

/**
 * @swagger
 *  /client/login:
 *    post:
 *      tags: [Client]
 *      description: Retorna um Token que remete ao seu usuário
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: pedroJorge@gmail.com
 *                  password:
 *                    type: string
 *                    example: 123456
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpUZXh0byIsImlhdCI6MTUxN
 */

clienteRoute.post('/create', validateNewUser, CreateClient.create);
/**
 * @swagger
 *  /client/create:
 *    post:
 *      tags: [Client]
 *      description: Retorna um Token que remete ao seu novo usuário
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: NewUser
 *                  email:
 *                    type: string
 *                    example: novoEmail@email.com
 *                  password:
 *                    type: string
 *                    example: senhaSupersegura
 *                  saldo:
 *                    type: integer
 *                    example: 2500
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpUZXh0byIsImlhdCI6MTUxN
 */

clienteRoute.put('/update', TokenValidate, ValidateUpdate, ClientUpdate.update);
/**
 * @swagger
 *  /client/update:
 *    put:
 *      tags: [Client]
 *      description: Retorna um Token que remete ao seu usuário atualizado - Você pode atualizar seu nome de usuário.
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: UserAtualizado
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpUZXh0byIsImlhdCI6MTUxN
 */

clienteRoute.delete('/delete', TokenValidate, DeleteClient.delete);
/**
 * @swagger
 *  /client/delete:
 *    delete:
 *      tags: [Client]
 *      description: Essa chamada não retorna nada. Mas o usuário será deletado
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  password:
 *                    type: string
 *                    example: 123456
 *      responses:
 *        204:
 */

clienteRoute.get('/conta', TokenValidate, ClientBalance.getBalance);
/**
 * @swagger
 *  /client/conta:
 *    get:
 *      tags: [Client]
 *      description: Retorna os dados da carteira do cliente.
 *      security:
 *        - bearerAuth: []
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
 *                    example: Pedro Jorge
 *                  token:
 *                    type: decimal
 *                    example: 250.00
 */

clienteRoute.get('/ativos', TokenValidate, ClientAssets.getAssets);
/**
 * @swagger
 *  /client/ativos:
 *    get:
 *      tags: [Client]
 *      description: Retorna os ativos do usuário.
 *      security:
 *        - bearerAuth: []
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
 *                    example: Pedro Jorge
 *                  assets:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                        name:
 *                          type: string
 *                          example: AAPL
 *                        quantity:
 *                          type: integer
 *                          example: 2
 *                        price:
 *                          type: decimal
 *                          example: 5.78
 */
clienteRoute.get('/log', TokenValidate, ClientHistory.history);
/**
 * @swagger
 *  /client/log:
 *    get:
 *      tags: [Client]
 *      description: Retorna o histórico do usuário.
 *      security:
 *        - bearerAuth: []
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
 *                    example: Pedro Jorge
 *                  assets:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        type:
 *                          type: string
 *                          example: venda
 *                        name:
 *                          type: string
 *                          example: AAPL
 *                        quantity:
 *                          type: integer
 *                          example: 2
 *                        price:
 *                          type: decimal
 *                          example: 5.78
 */

clienteRoute.post(
  '/conta/deposito',
  TokenValidate,
  validateBalance,
  ClientDeposit.setBalance,
);
/**
 * @swagger
 *  /conta/deposito:
 *    post:
 *      tags: [Client]
 *      description: Retorna o valor depositado
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  valor:
 *                    type: decimal
 *                    example: 500
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
 *                    example: Pedro Jorge
 *                  balance:
 *                    type: integer
 *                    example: 750
 */
clienteRoute.post(
  '/conta/saque',
  TokenValidate,
  validateBalance,
  ClientDeposit.setBalance,
);
/**
 * @swagger
 *  /conta/saque:
 *    post:
 *      tags: [Client]
 *      description: Retorna o valor sacado
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  valor:
 *                    type: decimal
 *                    example: 500
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
 *                    example: Pedro Jorge
 *                  balance:
 *                    type: integer
 *                    example: 250
 */

export default clienteRoute;
