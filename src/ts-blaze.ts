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

export { default as ensure } from './ensure'
export { Validator } from './validator'

export type InferValidatorType<V> = V extends Validator<infer T> ? T : never;

export const optional = <T>(validator: Validator<T>): UnionTypeValidator<Validator<T> | UndefinedValidator> => oneOf([ validator, createUndefinedValidator() ])
