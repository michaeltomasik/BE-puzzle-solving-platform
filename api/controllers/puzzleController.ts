import { Request, Response } from 'express';
import _isEqual from 'lodash/isEqual';
import { Puzzle } from '../models';

import { generatePuzzle, checkSolution } from '../../utils/puzzle';
import { STATUS_CODES } from '../../consts/statusCodes';

const puzzleController = {
  async generateSolution(req: Request, res: Response) {
    try {
      const puzzleType = req.params.id as unknown as number;
      const puzzle = await Puzzle.create({
        UserId: req.body.user.id,
        inputValues: generatePuzzle(puzzleType),
        solution: null,
        status: 'not_completed'
      });
      res.status(201).json(puzzle);
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
    }
  },

  async submitSolution(req: Request, res: Response) {
    try {
      const puzzle = await Puzzle.findOne({
        where: {
          id: req.body.puzzleId,
          UserId: req.body.userId
        }
      });
      const puzzleType = req.params.id as unknown as number;
  
      if (!puzzle) {
        return res.status(STATUS_CODES.UNAUTHORIZED).send();
      }
      const solution = req.body.solution;
      const correctSolution = checkSolution(puzzleType, puzzle.inputValues)
  
      if (_isEqual(solution, correctSolution)) {
        puzzle.status = 'completed';
        puzzle.solution = solution;
        await puzzle.save();
        return res.status(STATUS_CODES.CREATED).json(puzzle);
      } else {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Incorrect solution' });
      }
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
    }
  },

  async getPuzzleStatus(req: Request, res: Response) {
    try {
      const puzzle = await Puzzle.findOne({
        where: {
          id: req.params.id,
          UserId: req.body.user.id
        }
      });
      if (!puzzle) {
        return res.status(STATUS_CODES.UNAUTHORIZED).send();
      }
      res.status(STATUS_CODES.CREATED).json(puzzle);
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
    }
  }
}

export default puzzleController;
