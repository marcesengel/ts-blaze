# ts-blaze

This library makes type-safe usage of objects from unknown origin (-> api payloads, events, parsed files etc.) a blast.
It does so by generating [`typeguards`](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) for the validators you create.

## Usage

```ts
import * as blaze from 'ts-blaze'

const isHuman = blaze.object({
  name: blaze.string(),
  age: blaze.optional(
    blaze.number()
      .satisfies(val => val >= 0)
  )
})
type Human = blaze.InferValidatorType<typeof isHuman>

export const onlyAcceptHumans = (payload: any): Promise<Human> => {
  // throw if payload doesn't match schema
  const human = blaze.ensure(payload, isHuman) 

  // now your IDE/Editor can also complete this
  console.log(`Creating human with name "${human.name}".`)
  return db.createHuman(payload)
}

export const handleBadInput = (payload: any): Promise<Human | void> => {
  if (isHuman(payload)) {
    // typeguarded -> typeof payload is Human
    return db.createHuman(payload)
  }

  console.warn('Did not receive a human.')
  return Promise.resolve()
}
```

## Details

The `object` validator matches standard TypeScript behaviour, i.e. it doesn't complain about additional keys.

## Provided Types

Currently the following types are supported: `object`, `array`, `string`, `number`, `oneOf([ ...unionTypes ])`, `undefined`, `null`, `any`, `record`, `string literal` (using `string('literal')`) and `number literal` (using `number(1)`).

### Options

Every type except the literal types support `.satisfies(predicate: (value: T) => boolean)`. In addition `string` supports `.json()` using `JSON.parse(...)` for validation. The `object` type supports `.exact()`, not allowing the object to have additional keys.
You can overwrite `JSON.parse(...)` while validating in order to not have to parse complex JSON multiple times (once for validation and once for usage) or use a custom `.satisfies(...)` predicate for that.

### Define Your Own

```ts
import * as blaze from 'ts-blaze'
import { validate: isUuid } from 'uuid'

export const uuid = blaze.string()
  .satisfies(isUuid)
```

## Error Messages

At the moment there are no plans to implement validation error messages. However I'm open to ideas so feel free to create issues and PRs for this as well.
