import { Model } from 'sequelize';

export interface UserInstance extends Model {
  id: number;
  username: string;
  password: string;
}
