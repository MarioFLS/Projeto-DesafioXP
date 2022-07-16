import {  Model, STRING, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

  class userAssets extends Model {
  }
  userAssets.init({
    id: { type: INTEGER, primaryKey: true },
    userId: { type: INTEGER, field: 'user_id' },
    assetId: { type: INTEGER, field: 'asset_id' },
    assetName: { type: STRING, field: 'asset_name', allowNull: false },
    purchasePrice: { type: INTEGER, field: 'purchase_price', allowNull: false, },
  }, {
    sequelize: db,
    modelName: 'User_Assets',
    timestamps: false,
  });

export default userAssets;
