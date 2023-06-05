import { Model } from 'sequelize';

export interface PuzzleInstance extends Model {
  name: string;
  status: string;
  inputValues: string;
  solution: number;
  userId: number;
}