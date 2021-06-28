import { createValidator, Validator } from '../validator'
import { ensureError, ensurePath } from '../ensure'

export interface ObjectValidator<O extends Record<string, unknown> = any> extends Validator<O> {
  exact(): this;
}

export type ObjectSchema<O extends Record<string, unknown>> = {
  [Property in keyof O]: Validator<O[Property]>;
}

const createObjectValidator = <T extends Record<string, unknown>>(keyValidators: ObjectSchema<T>): ObjectValidator<T> => {
  const validateObject = createValidator<ObjectValidator<T>>(
    (validators, applyValidators) => {
      const validate = (value: any): value is T => {
        return ensureError('be type object', typeof value === 'object' && !Array.isArray(value) && value !== null) &&
          Object.entries(keyValidators).every(([ key, validator ]) => ensurePath(key, validator(value[key]))) &&
          applyValidators(value)
      }

      validate.exact = () => {
        const schemaKeys = new Set(Object.keys(keyValidators))

        validators.push((value) => {
          const valueKeys = Object.keys(value)
          return ensureError(
            `have exactly ${schemaKeys.size} keys`,
            valueKeys.length <= schemaKeys.size &&
              valueKeys.every(key => schemaKeys.has(key))
          )
        })

        return validate
      }

      return validate as ObjectValidator<T>
    }
  )

  return validateObject
}

export default createObjectValidator
