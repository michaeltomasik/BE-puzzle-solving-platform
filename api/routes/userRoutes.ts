import express from 'express';
import userController from '../controllers/userController';
import { authenticate } from '../middleware/authenticate';

export const userRouter = express.Router();

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/@:username', userController.getUserProfile);
userRouter.use(authenticate); // This middleware is applied to routes defined after this line
userRouter.post('/logout', userController.logout);
