import { createValidator, Validator } from '../validator'

export interface AnyValidator extends Validator<any> {
  
}

const createAnyValidator = (): AnyValidator => {
  const validateAny = createValidator<AnyValidator>(
    (validators, applyValidators) =>
      (value: any): value is any =>
        applyValidators(value)
  )

  return validateAny
}

export default createAnyValidator
