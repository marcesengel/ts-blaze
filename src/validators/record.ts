import { createValidator, Validator } from '../validator'

export interface RecordValidator<T> extends Validator<Record<string, T>> {

}

const createRecordValidator = <T>(elementValidator: Validator<T>): RecordValidator<T> => {
  const validateRecord = createValidator<RecordValidator<T>>(
    (validators, applyValidators) =>
      (value: any): value is Record<string, T> => {
        return value !== null &&
          typeof value === 'object' &&
          Object.values(value).every(elementValidator) &&
          applyValidators(value)
      }
  )

  return validateRecord
}

export default createRecordValidator
