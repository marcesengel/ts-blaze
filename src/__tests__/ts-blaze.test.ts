import { object, number, string, array, InferValidatorType } from '../ts-blaze'

describe('ts-blaze', () => {
  test('validator type inference', () => {
    const isValidData = array(object({
      number: number(),
      nested: object({
        string: string()
      })
    }))

    const data: any = [ {
      number: 3,
      nested: {
        string: 'Hello World!'
      }
    } ]

    if (isValidData(data)) {
      assertType<InferValidatorType<typeof isValidData>>(data)

      assertType<number>(data[0].number)
      // @ts-expect-error
      assertType<string>(data[0].number)
      // @ts-expect-error
      assertType<number[]>(data[0].number)

      assertType<string>(data[0].nested.string)
      // @ts-expect-error
      assertType<number>(data[0].nested.string)
      // @ts-expect-error
      assertType<string[]>(data[0].nested.string)
    }
  })
})

const assertType = <T>(arg: T) => {}
