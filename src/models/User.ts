import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';

import db from '.';

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  active!: boolean;
  subscription_date!: Date;
}

User.init(
  {
    id:  {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(100),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      allowNull: false,
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    active: {
      type: BOOLEAN,
      allowNull: false,
    },
    subscriptionDate:{
      type: DATE,
      allowNull: false,
      field: 'subscription_date',
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
  }
);

// User.hasOne(User, { foreignKey: 'id', as: 'userId' });

export default User;
