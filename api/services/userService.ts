import { Puzzle, User, UserInstance } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tokenBlacklist } from '../middleware/blacklistLogout';

export const createUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({
    username,
    password: hashedPassword,
  });
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Incorrect username or password');
  }

  const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '10h' });

  return { user, accessToken };
};

export const logout = async (authHeader: string) => {
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    tokenBlacklist[token] = true;
    return { status: 'success', message: 'Logged out' };
  } else {
    return { status: 'failure', message: 'Token not found' };
  }
}

export const getUserProfile = async(username: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return null;
  }
  const puzzles = await Puzzle.findAll({ where: { userId: (user as UserInstance).id } });
  return { user, puzzles };
}
