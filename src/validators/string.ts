import type { Validator } from '../validator'

export interface StringValidator extends Validator<string> {
  
}

const createStringValidator = (): StringValidator => {
  const validateString = (value: any): value is string => {
    return typeof value === 'string'
  }

  return validateString
}

export default createStringValidator
