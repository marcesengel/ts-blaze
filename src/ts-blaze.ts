import transformValidatorName from './transformValidatorName'
import type { Validator } from './validator'

export { default as object, ObjectValidator, ObjectSchema } from './validators/object'
export { default as array, ArrayValidator } from './validators/array'
export { default as string, StringValidator } from './validators/string'
export { default as number, NumberValidator } from './validators/number'
export { default as oneOf, UnionTypeValidator } from './validators/union'

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
