import {
  Model, STRING, INTEGER, DECIMAL,
} from 'sequelize';
import db from '.';
import UserAssets from './UserAssets';
import UserHistory from './UserHistory';

class Asset extends Model {}
Asset.init(
  {
    id: { type: INTEGER, primaryKey: true },
    name: { type: STRING, allowNull: false },
    company: { type: STRING, allowNull: false },
    amount: { type: INTEGER, allowNull: false },
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

UserHistory.belongsToMany(Asset, {
  as: 'assets', foreignKey: 'asset_id', through: UserHistory, otherKey: 'user_id',
});
Asset.hasMany(UserHistory, { as: 'userHistory', foreignKey: 'asset_id' });

export default Asset;
