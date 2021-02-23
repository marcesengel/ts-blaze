import type { Validator } from '../validator'

export interface NumberValidator extends Validator<number> {
  
}

const createNumberValidator = (): NumberValidator => {
  const validateNumber = (value: any): value is number => {
    return typeof value === 'number'
  }

  return validateNumber
}

export default createNumberValidator
