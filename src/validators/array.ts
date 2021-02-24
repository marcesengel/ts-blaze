import { createValidator, Validator } from '../validator'

export interface ArrayValidator<T> extends Validator<T[]> {

}

const createArrayValidator = <T>(elementValidator: Validator<T>): ArrayValidator<T> => {
  const validateArray = createValidator<ArrayValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is T[] => {
        return Array.isArray(value) &&
          value.every(elementValidator) &&
          applyValidators(value)
      }
  )

  return validateArray
}

export default createArrayValidator
