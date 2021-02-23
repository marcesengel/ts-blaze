import type { Validator } from '../validator'

export interface NumberValidator<T extends number> extends Validator<T> {
  
}

const createNumberValidator = <T extends number = number>(literal?: T): NumberValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateNumberLiteral = (value: any): value is T =>
      value === literal

    return validateNumberLiteral
  }

  const validateNumber = (value: any): value is T =>
    typeof value === 'number'

  return validateNumber
}

export default createNumberValidator
