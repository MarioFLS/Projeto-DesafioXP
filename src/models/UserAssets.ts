import {  Model, STRING, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

  class userAssets extends Model {
  }
  userAssets.init({
    userId: { type: INTEGER, field: 'user_id', primaryKey: true },
    assetId: { type: INTEGER, field: 'asset_id', primaryKey: true },
    assetName: { type: STRING, field: 'asset_name', allowNull: false },
    purchasePrice: { type: INTEGER, field: 'purchase_price', allowNull: false, },
  }, {
    sequelize: db,
    modelName: 'User_Assets',
    timestamps: false,
  });

export default userAssets;
