import { createValidator, createNotImplementedHandler, Validator } from '../validator'

export interface StringValidator<T extends string> extends Validator<T> {
  json(): StringValidator<T>;
}

const createStringValidator = <T extends string = string>(literal?: T): StringValidator<T> => {
  if (typeof literal !== 'undefined') {
    const validateStringLiteral = (value: any): value is T =>
      value === literal
    
    const notImplemented = createNotImplementedHandler('string literals')
    validateStringLiteral.satisfies = notImplemented
    validateStringLiteral.json = notImplemented

    return validateStringLiteral
  }

  const validateString = createValidator<StringValidator<T>>(
    (validators, applyValidators) => {
      const validate = (value: any): value is T =>
        typeof value === 'string' && applyValidators(value as T)
      
      validate.json = () => {
        validators.push(isJson)

        return validate as StringValidator<T>
      }

      return validate
    }
  )

  return validateString
}

export default createStringValidator

const isJson = (value: string): boolean => {
  try {
    JSON.parse(value)
    return true
  } catch (error) {
    return false
  }
}
