import express from 'express';
import puzzleController from '../controllers/puzzleController';
import { authenticate } from '../middleware/authenticate';

export const puzzleRouter = express.Router();

puzzleRouter.use(authenticate); // This middleware is applied to routes defined after this line
puzzleRouter.post('/solution/:id', puzzleController.submitSolution);
puzzleRouter.post('/generate/:id', puzzleController.generateSolution);
puzzleRouter.get('/:id', puzzleController.getPuzzleStatus);
