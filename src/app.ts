import express from './express';
import 'dotenv/config';
import clientRoute from './routes/route.client';

const port = process.env.APP_PORT || 3002;

express.use('/user', clientRoute);

express.listen(port, () => console.log('Olá, você está na porta', port));
