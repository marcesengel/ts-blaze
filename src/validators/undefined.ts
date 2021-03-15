import { createValidator, Validator } from '../validator'

export interface UndefinedValidator extends Validator<undefined> {
  
}

const createUndefinedValidator = (): UndefinedValidator => {
  const validateUndefined = createValidator<UndefinedValidator>(
    (validators, applyValidators) =>
      (value: any): value is undefined =>
        value === undefined
  )

  return validateUndefined
}

export default createUndefinedValidator
