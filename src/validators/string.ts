import { createValidator, createNotImplementedHandler, Validator } from '../validator'

export interface StringValidator<T extends string> extends Validator<T> {
  
}

const createStringValidator = <T extends string = string>(literal?: T): StringValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateStringLiteral = (value: any): value is T =>
      value === literal
    
    const notImplemented = createNotImplementedHandler('string literals')
    validateStringLiteral.satisfies = notImplemented

    return validateStringLiteral
  }

  const validateString = createValidator<StringValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T =>
        typeof value === 'string' && applyValidators(value as T)
  )

  return validateString
}

export default createStringValidator
