import { createValidator, Validator } from '../validator'

type InferUnionValidatorType<V extends Validator<unknown>> = V extends Validator<infer T>
    ? T
    : never

export interface UnionTypeValidator<V extends Validator<unknown>> extends Validator<InferUnionValidatorType<V>> {

}

// sadly collecting (...unionTypes: V[]) does not work because this way
//  ts complains about missmatching values in the argument list
const createUnionTypeValidator = <V extends Validator<unknown>>(unionTypes: V[]): UnionTypeValidator<V> => {
  const validateUnionType = createValidator<UnionTypeValidator<V>>(
    (validators, applyValidators) => {
      return (value: any): value is InferUnionValidatorType<V> =>
        unionTypes.some((isType) => isType(value)) && applyValidators(value)
    }
  )

  return validateUnionType
}

export default createUnionTypeValidator
