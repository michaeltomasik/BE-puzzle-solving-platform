import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from '../../consts/statusCodes';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1] as string;
  
  if (token == null) return res.sendStatus(STATUS_CODES.UNAUTHORIZED);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) {
      console.error('Error while verifying token: ', err);
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Invalid token' });
      }
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error while verifying token' });
    }

    req.body.user = user;
    next();
  });
};
