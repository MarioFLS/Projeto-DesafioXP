import { DOUBLE } from 'sequelize';
import { STRING, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

const { Model } = require('sequelize');

class Asset extends Model {
  id?: string;
  name?: string;
  amount?: number;
  price?: number;
}
Asset.init(
  {
    id: { type: INTEGER, primaryKey: true, field: 'user_id' },
    name: { type: STRING, allowNull: false },
    amount: { type: INTEGER, allowNull: false },
    price: { type: DOUBLE, allowNull: false },
  },
  {
    sequelize: db,
    modelName: 'Asset',
    timestamps: false,
  },
);

export default Asset;
