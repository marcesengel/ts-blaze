import { InferValidatorType } from './ts-blaze'

export interface Validator<T> {
  (value: any): value is T;
  satisfies(predicate: (value: T) => boolean): Validator<T>;
}

export const createNotImplementedHandler = (pluralTypeName: string) => (...args: any[]) => {
  throw new Error(`This function is not implemented for ${pluralTypeName}.`)
}

export const createValidator = <V extends Validator<T>, T = InferValidatorType<V>>(
  buildValidator: (validators: ((value: T) => boolean)[], applyValidators: (value: T) => boolean) => Omit<V, keyof Validator<any>>
): V => {
  const validators: ((value: T) => boolean)[] = []

  const validator = buildValidator(
    validators,
    (value) => validators.every((validator) => validator(value))
  ) as V // !!! missing base validator functions will not be checked by TS

  validator.satisfies = (predicate) => {
    validators.push(predicate)
    return validator
  }

  return validator
}
