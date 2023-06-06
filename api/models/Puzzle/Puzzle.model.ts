import { DataTypes } from 'sequelize';
import { PuzzleInstance } from './Puzzle.interface';
import sequelize from '../../../config/db';

// Define puzzle model
export const Puzzle = sequelize.define<PuzzleInstance>('Puzzle', {
  name: DataTypes.STRING,
  status: DataTypes.STRING,
  inputValues: DataTypes.STRING,
  solution: DataTypes.STRING,
  puzzleType: DataTypes.INTEGER,
});
