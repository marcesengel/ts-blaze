import { createValidator, Validator } from '../validator'
import { ensureError, ensurePath } from '../ensure'

export interface ArrayValidator<T> extends Validator<T[]> {

}

const createArrayValidator = <T>(elementValidator: Validator<T>): ArrayValidator<T> => {
  const validateArray = createValidator<ArrayValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T[] => {
        return ensureError('be type array', Array.isArray(value)) &&
          value.every((val,idx) => ensurePath(idx, elementValidator(val))) &&
          applyValidators(value)
      }
  )

  return validateArray
}

export default createArrayValidator
