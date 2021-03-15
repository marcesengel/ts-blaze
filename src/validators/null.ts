import { createValidator, Validator } from '../validator'

export interface NullValidator extends Validator<null> {
  
}

const createNullValidator = (): NullValidator => {
  const validateNull = createValidator<NullValidator>(
    (validators, applyValidators) =>
      (value: any): value is null =>
        value === null
  )

  return validateNull
}

export default createNullValidator
