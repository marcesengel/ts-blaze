import type { Validator } from '../validator'

export interface StringValidator<T extends string> extends Validator<T> {
  
}

const createStringValidator = <T extends string = string>(literal?: T): StringValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateStringLiteral = (value: any): value is T =>
      value === literal

    return validateStringLiteral
  }

  const validateString = (value: any): value is T =>
    typeof value === 'string'

  return validateString
}

export default createStringValidator
