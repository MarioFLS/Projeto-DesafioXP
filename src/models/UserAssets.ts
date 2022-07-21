import {
  Model, INTEGER, DECIMAL,
} from 'sequelize';
import db from '.';

class userAssets extends Model {}
userAssets.init(
  {
    userId: { type: INTEGER, field: 'user_id', primaryKey: true },
    assetId: { type: INTEGER, field: 'asset_id', primaryKey: true },
    amount: { type: INTEGER, allowNull: false },
    quantity: { type: DECIMAL, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'User_Assets',
    timestamps: false,
  },
);

export default userAssets;
