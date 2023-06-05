import { DataTypes } from 'sequelize';
import { UserInstance } from './User.interface';
import sequelize from '../../../config/db';

// Define user model
export const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});
