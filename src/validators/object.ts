import type { Validator } from '../validator'

export interface ObjectValidator<O extends Record<string, unknown> = any> extends Validator<O> {

}

export type ObjectSchema<O extends Record<string, unknown>> = {
  [Property in keyof O]: Validator<O[Property]>;
}

const createObjectValidator = <T extends Record<string, unknown>>(keyValidators: ObjectSchema<T>): ObjectValidator<T> => {
  const validateObject = (value: any): value is T => {
    return typeof value === 'object' &&
      value !== null &&
      !Object.entries(keyValidators).map(([ key, validator ]) => validator(value[key])).includes(false)
  }

  return validateObject
}

export default createObjectValidator
