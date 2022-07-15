import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: 'investimentosApi',
  host: process.env.DB_HOST || 'localhost',
  port: 3310,
  dialect: 'mysql',
};

export = config;
