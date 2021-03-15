import { createNotImplementedHandler, createValidator, Validator } from '../validator'

export interface BooleanValidator<T extends boolean> extends Validator<T> {
  
}

const createBooleanValidator = <T extends boolean = boolean>(literal?: T): BooleanValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateBooleanLiteral = (value: any): value is T =>
      value === literal
    
    const notImplemented = createNotImplementedHandler('boolean literals')
    validateBooleanLiteral.satisfies = notImplemented

    return validateBooleanLiteral
  }

  const validateBoolean = createValidator<BooleanValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T =>
        typeof value === 'boolean' && applyValidators(value as T)
  )

  return validateBoolean
}

export default createBooleanValidator
