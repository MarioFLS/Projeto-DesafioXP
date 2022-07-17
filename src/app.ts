import express from './express';
import 'dotenv/config';

const port = process.env.APP_PORT || 3002;

express.listen(port, () => console.log('Olá, você está na porta', port));
