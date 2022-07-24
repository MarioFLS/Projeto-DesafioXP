import {
  Model, STRING, INTEGER, DECIMAL,
} from 'sequelize';
import db from '.';
import UserAssets from './UserAssets';
import UserLog from './UserLog';

class Asset extends Model {}
Asset.init(
  {
    id: { type: INTEGER, primaryKey: true },
    name: { type: STRING, allowNull: false },
    company: { type: STRING, allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'Asset',
    timestamps: false,
  },
);

UserAssets.belongsToMany(Asset, {
  as: 'assets', foreignKey: 'asset_id', through: UserAssets, otherKey: 'user_id',
});

Asset.hasMany(UserAssets, { as: 'userAssets', foreignKey: 'asset_id' });

UserLog.belongsToMany(Asset, {
  as: 'assets', foreignKey: 'asset_id', through: UserLog, otherKey: 'user_id',
});
Asset.hasMany(UserLog, { as: 'userHistory', foreignKey: 'asset_id' });

export default Asset;
