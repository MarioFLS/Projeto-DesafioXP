import {
  Model, INTEGER, STRING, BOOLEAN, DATE,
} from 'sequelize';

import db from '.';
import Wallet from './Wallet';

class User extends Model {
  id!: number;
  name!: string;
  email!:string;
  password!:string;
  active!:boolean;
  subscriptionDate!: Date;
}

User.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    active: {
      type: BOOLEAN,
      allowNull: false,
    },
    subscriptionDate: {
      type: DATE,
      allowNull: false,
      field: 'subscription_date',
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
  },
);
Wallet.belongsTo(User, { as: 'user', foreignKey: 'user_Id' });
User.hasOne(Wallet, { as: 'wallet', foreignKey: 'user_Id' });

export default User;
