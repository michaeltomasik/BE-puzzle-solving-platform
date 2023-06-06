import { sortBy as _sortBy, reverse as _reverse } from 'lodash';

import { STATUS_CODES } from '../consts/statusCodes';

const puzzlesEquasions = [
  () => {}, // 0
  () => {
    const [value1, value2] = [Math.ceil(Math.random() * 1000), Math.ceil(Math.random() * 1000)]
    return { value1, value2 }
  }, // 1
  () => Array.from({length: STATUS_CODES.INTERNAL_SERVER_ERROR}, () => Math.floor(Math.random() * 1000) + 1)
]

export const generatePuzzle = (puzzleType: number) => 
  JSON.stringify(puzzlesEquasions[puzzleType]())

const solutionValidator = [
  () => {}, // 0
  (inputValues: string) => {
    const { value1, value2 } = JSON.parse(inputValues)
    return (value1 + value2)
  }, // 1
  (inputValues: string) => {
    return (_reverse(_sortBy(JSON.parse(inputValues))))
  }, // 2
]
export const checkSolution = (puzzleType: number, inputValues: string) =>
  solutionValidator[puzzleType](inputValues) || false
