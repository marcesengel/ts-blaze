# ts-blaze

This library makes type-safe usage of objects from unknown origin (-> api payloads, events, parsed files etc.) a blast.
It does so by generating [`typeguards`](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) for the validators you create.

## Usage

```ts
import { object, string, number, ensure } from 'ts-blaze'

const isHuman = object({
  name: string(),
  age: number()
})
type Human = InferValidatorType<typeof isHuman>

export const onlyAcceptHumans = (payload: any): Promise<Human> => {
  const human = ensure(payload, isHuman) // throws if payload doesn't match schema

  console.log(`Creating human with name "${human.name}".`) // your IDE/Editor can auto complete this
  return db.createHuman(payload)
}

export const gracefullyHandleBadInput = (payload: any): Promise<Human | void> => {
  if (isHuman(payload)) {
    return db.createHuman(payload) // no typescript error
  }

  console.warn('Did not receive a human')
  return Promise.resolve()
}
```

## Details

The `object` validator matches standard TypeScript behaviour, i.e. it doesn't complain about additional keys.

## Provided Types

Currently the following types are supported: `object`, `array`, `string`, `number`, `string literal` (using `string('literal')`) and `number literal` (using `number(1)`).

### Define Your Own

```ts
import type { Validator } from 'ts-blaze'

export interface UUIDValidator extends Validator<string> {
  
}

const createUuidValidator = (): StringValidator => {
  const validateUuid = (value: any): value is string => {
    return typeof value === 'string' &&
      isUuid(value)
  }

  return validateUuid
}

export default createUuidValidator
```

## Options

Currently there are no additional validation options implemented. The api is going to be `number(...).min(0).integer()`. Feel free to open PRs with implementations.

## Error Messages

At the moment there are no plans to implement validation error messages. However I'm open to ideas so feel free to create issues and PRs for this as well.
