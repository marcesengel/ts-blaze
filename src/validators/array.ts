import type { Validator } from '../validator'

export interface ArrayValidator<T> extends Validator<T[]> {

}

const createArrayValidator = <T>(elementValidator: Validator<T>): ArrayValidator<T> => {
  const validateArray = (value: any): value is T[] => {
    return Array.isArray(value) &&
      value.every(elementValidator)
  }

  return validateArray
}

export default createArrayValidator
