import { createNotImplementedHandler, createValidator, Validator } from '../validator'
import { ensureError } from '../ensure'

export interface BooleanValidator<T extends boolean> extends Validator<T> {
  
}

const createBooleanValidator = <T extends boolean = boolean>(literal?: T): BooleanValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateBooleanLiteral = (value: any): value is T =>
      ensureError(`equal ${literal}`, value === literal)
    
    const notImplemented = createNotImplementedHandler('boolean literals')
    validateBooleanLiteral.satisfies = notImplemented

    return validateBooleanLiteral
  }

  const validateBoolean = createValidator<BooleanValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T =>
        ensureError('be type boolean', typeof value === 'boolean') &&
        applyValidators(value as T)
  )

  return validateBoolean
}

export default createBooleanValidator
