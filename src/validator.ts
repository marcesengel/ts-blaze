import { InferValidatorType } from './ts-blaze'

export interface Validator<T> {
  (value: any): value is T;
}

export const createValidator = <V extends Validator<T>, T = InferValidatorType<V>>(
  buildValidator: (validators: ((value: T) => boolean)[], applyValidators: (value: T) => boolean) => V
) => {
  const validators: ((value: T) => boolean)[] = []

  return buildValidator(
    validators,
    (value) => validators.every((validator) => validator(value))
  )
}
