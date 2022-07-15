import { Sequelize } from 'sequelize';
import * as config from '../config/database';

console.log(config);

export default new Sequelize(config);
