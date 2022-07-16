import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';

import db from '.';
import Asset from './Asset';
import userAssets from './UserAssets';
import Wallet from './Wallet';

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  active!: boolean;
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
  }
);

Wallet.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasOne(Wallet, { as: 'wallet', foreignKey: 'user_id' });

User.hasMany(userAssets, { as: 'userAssets', foreignKey: 'user_id' });
userAssets.belongsToMany(User, { as: 'user', foreignKey: 'user_Id', through: Asset, otherKey: 'asset_id'
});

export default User;
