import { number, object, string, oneOf } from '../../ts-blaze'

describe('oneOf', () => {
  it('works', () => {
    const isEvent = oneOf([
      object({ type: string('START') }),
      object({ type: string('FINISH'), resultCode: number() })
    ])

    const value: any = 1
    if (isEvent(value)) {
      value.type

      // @ts-expect-error
      value.resultCode // does not exist on { type: 'START' }

      if ('resultCode' in value) {
        value.resultCode + 1 // check that ts can infer resultCode to be of type number
      }
    }
  })

  it('supports type inference in predicates', () => {
    oneOf([
      number(),
      string()
    ])
      .satisfies(val => assertType<string | number>(val))
      // @ts-expect-error
      .satisfies(val => assertType<string>(val))
      // @ts-expect-error
      .satisfies(val => assertType<number>(val))
      // @ts-expect-error
      .satisfies(val => assertType<string[]>(val))
      // @ts-expect-error
      .satisfies(val => assertType<number[]>(val))
  })
})

const assertType = <T>(arg: T): boolean => true
