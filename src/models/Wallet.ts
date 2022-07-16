import { Model, INTEGER, DECIMAL } from 'sequelize';

import db from '.';

class Wallet extends Model {
  userId!:number;
  balance!:number;
}
Wallet.init({
  userId: {
    type: INTEGER,
    primaryKey: true,
    field: 'user_id',
  },
  balance: { type: DECIMAL, allowNull: false },
}, {
  sequelize: db,
  modelName: 'Wallet',
  timestamps: false,
});
export default Wallet;
