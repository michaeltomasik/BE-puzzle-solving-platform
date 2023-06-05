import { Request, Response } from 'express';

import * as userService from '../services/userService';
import { STATUS_CODES } from '../../consts/statusCodes';

const userController = {
  async signup(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body.username, req.body.password);
      res.status(STATUS_CODES.CREATED).json(user);
    } catch (err) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send((err as Error).message);
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { accessToken } = await userService.loginUser(req.body.username, req.body.password);
      res.json({ accessToken });
    } catch (err) {
      res.status(STATUS_CODES.BAD_REQUEST).send((err as Error).message);
    }
  },

  // A sample "logout" route that blacklists the provided token.
  async logout(req: Request, res: Response) {
    const result = await userService.logout(req.headers.authorization || '');
    if (result.status === 'success') {
      res.json({ message: result.message });
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: result.message });
    }
  },

  async getUserProfile(req: Request, res: Response) {
    const userProfile = await userService.getUserProfile(req.params.username);
    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(STATUS_CODES.UNAUTHORIZED).send('User not found');
    }
  }
}

export default userController;
