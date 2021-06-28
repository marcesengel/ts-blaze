import { createValidator, Validator } from '../validator'
import { ensureError } from '../ensure'

export interface UndefinedValidator extends Validator<undefined> {
  
}

const createUndefinedValidator = (): UndefinedValidator => {
  const validateUndefined = createValidator<UndefinedValidator>(
    (validators, applyValidators) =>
      (value: any): value is undefined =>
        ensureError('be undefined', value === undefined)
  )

  return validateUndefined
}

export default createUndefinedValidator
