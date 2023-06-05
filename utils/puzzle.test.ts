import * as lodash from 'lodash';
import { generatePuzzle, checkSolution } from './puzzle';

describe("Puzzle service", () => {
  let sortBySpy: jest.SpyInstance;
  let reverseSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create spies on the sortBy and reverse functions
    sortBySpy = jest.spyOn(lodash, 'sortBy');
    reverseSpy = jest.spyOn(lodash, 'reverse');

    // Provide a mock implementation for the spies
    sortBySpy.mockImplementation((arr) => arr.sort());
    reverseSpy.mockImplementation((arr) => arr.reverse());
  });

  afterEach(() => {
    // Clear all mocks after each test
    sortBySpy.mockClear();
    reverseSpy.mockClear();
  });

  test("Puzzle generation for puzzleType 1", () => {
    const result = JSON.parse(generatePuzzle(1));
    expect(result.value1).toBeDefined();
    expect(result.value2).toBeDefined();
  });

  test("Puzzle generation for puzzleType 2", () => {
    const result = JSON.parse(generatePuzzle(2));
    expect(result.length).toBe(500);
    result.forEach(value => {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(1000);
    });
  });

  test("Solution check for puzzleType 1", () => {
    const puzzle = JSON.stringify({value1: 200, value2: 300});
    const solution = checkSolution(1, puzzle);
    expect(solution).toBe(500);
  });

  test("Solution check for puzzleType 2", () => {
    const puzzle = JSON.stringify([300, 200, 100]);
    const solution = checkSolution(2, puzzle);
    expect(solution).toEqual([300, 200, 100]);
  });
});
