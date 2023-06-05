import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from '../../consts/statusCodes';

// A simple in-memory "blacklist" for our tokens.
export const tokenBlacklist: { [key: string]: boolean } = {};

export const blacklistLogout = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token && tokenBlacklist[token]) {
    return res.sendStatus(STATUS_CODES.FORBIDDEN);
  }

  next();};
