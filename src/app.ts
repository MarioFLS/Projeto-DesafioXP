import express from './express';
import 'dotenv/config';
import 'express-async-errors';
import Error from './middleware/middleware.error';
import clientRoute from './routes/route.client';

const port = process.env.APP_PORT || 3002;

express.use('/client', clientRoute);
express.use(Error);
express.listen(port, () => console.log('Olá, você está na porta', port));
