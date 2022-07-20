import {
  Model, INTEGER, STRING, BOOLEAN, DATE,
} from 'sequelize';

import db from '.';
import Asset from './Asset';
import UserAssets from './UserAssets';
import UserHistory from './UserHistory';
import Wallet from './Wallet';

class User extends Model {
  null?: number;
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

Wallet.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasOne(Wallet, { as: 'wallet', foreignKey: 'user_id' });

User.hasMany(UserAssets, { as: 'Assets', foreignKey: 'user_id' });
UserAssets.belongsToMany(User, {
  as: 'user', foreignKey: 'user_Id', through: Asset, otherKey: 'asset_id',
});

User.hasMany(UserHistory, { as: 'History', foreignKey: 'user_id' });
UserHistory.belongsToMany(User, {
  as: 'user', foreignKey: 'user_Id', through: UserHistory, otherKey: 'asset_id',
});

export default User;
