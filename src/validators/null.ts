import { createValidator, Validator } from '../validator'
import { ensureError } from '../ensure'

export interface NullValidator extends Validator<null> {
  
}

const createNullValidator = (): NullValidator => {
  const validateNull = createValidator<NullValidator>(
    (validators, applyValidators) =>
      (value: any): value is null =>
        ensureError('be null', value === null)
  )

  return validateNull
}

export default createNullValidator
