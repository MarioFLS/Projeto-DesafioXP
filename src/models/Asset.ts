import { Model, STRING, INTEGER, DECIMAL } from 'sequelize';
import db from '.';
import userAssets from './UserAssets';

class Asset extends Model {
  id?: string;
  name?: string;
  amount?: number;
  price?: number;
}
Asset.init(
  {
    id: { type: INTEGER, primaryKey: true },
    name: { type: STRING, allowNull: false },
    amount: { type: INTEGER, allowNull: false },
    price: { type: DECIMAL, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'Asset',
    timestamps: false,
  },
);

userAssets.belongsToMany(Asset, { as: 'assets', foreignKey: 'asset_id', through: userAssets, otherKey: 'user_id' });
Asset.hasMany(userAssets, { as: 'userAssets', foreignKey: 'asset_id' });

export default Asset;
