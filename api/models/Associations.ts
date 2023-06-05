import { User } from './User';
import { Puzzle } from './Puzzle';

// Establishing associations
User.hasMany(Puzzle, {
  foreignKey: 'UserId',
  as: 'puzzles'
});
Puzzle.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'user'
});
