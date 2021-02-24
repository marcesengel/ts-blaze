import { createValidator, Validator } from '../validator'

export interface NumberValidator<T extends number> extends Validator<T> {
  
}

const createNumberValidator = <T extends number = number>(literal?: T): NumberValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateNumberLiteral = (value: any): value is T =>
      value === literal

    return validateNumberLiteral
  }

  const validateNumber = createValidator<NumberValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T =>
        typeof value === 'number' && applyValidators(value as T)
  )

  return validateNumber
}

export default createNumberValidator
