import {
  Model, STRING, DATE, INTEGER, DECIMAL,
} from 'sequelize';
import db from '.';

class UserHistory extends Model {}

UserHistory.init(
  {
    id: { type: INTEGER, primaryKey: true },
    userId: { type: INTEGER, allowNull: false, field: 'user_id' },
    assetId: { type: INTEGER, allowNull: false, field: 'asset_id' },
    type: { type: STRING, allowNull: false },
    log: { type: DATE, allowNull: false },
    quantity: { type: INTEGER, allowNull: false },
    amount: { type: DECIMAL, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'User_Historic',
    timestamps: false,
  },
);

export default UserHistory;
