import transformValidatorName from './transformValidatorName'
import type { Validator } from './validator'
import { default as oneOf, UnionTypeValidator } from './validators/union'
import { default as createUndefinedValidator, UndefinedValidator } from './validators/undefined'

export { default as object, ObjectValidator, ObjectSchema } from './validators/object'
export { default as array, ArrayValidator } from './validators/array'
export { default as string, StringValidator } from './validators/string'
export { default as number, NumberValidator } from './validators/number'
export { default as oneOf, UnionTypeValidator } from './validators/union'
export { default as boolean, BooleanValidator } from './validators/boolean'
export { default as undefined, UndefinedValidator } from './validators/undefined'
export { default as null, NullValidator } from './validators/null'
export { default as any, AnyValidator } from './validators/any'
export { default as record, RecordValidator } from './validators/record'

export { Validator } from './validator'

export type InferValidatorType<V> = V extends Validator<infer T>
  ? T
  : never;

export const ensure = <T>(value: any, validate: Validator<T>): T => {
  if (!validate(value)) {
    throw new Error(`Received invalid ${transformValidatorName(validate)}.`)
  }

  return value
}

export const optional = <T>(validator: Validator<T>): UnionTypeValidator<Validator<T> | UndefinedValidator> => oneOf([ validator, createUndefinedValidator() ])
