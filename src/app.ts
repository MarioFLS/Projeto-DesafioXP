import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import express from './express';
import 'dotenv/config';
import 'express-async-errors';
import swaggerConfig from './docs/swagger.config';
import Error from './middleware/middleware.error';
import clientRoute from './routes/route.client';
import assetsRoute from './routes/route.asset';
import investimentRoute from './routes/route.investiment';

const port = process.env.APP_PORT || 3002;

express.use('/client', clientRoute);
express.use('/ativos', assetsRoute);
express.use('/investimentos', investimentRoute);

const swaggerDoc = swaggerJSDoc(swaggerConfig);
express.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

express.use(Error);
express.listen(port, () => console.log('Olá, você está na porta', port));
