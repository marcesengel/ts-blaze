import { object, number, string, array, ensure, InferValidatorType } from './ts-blaze'

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

  describe('ensure(value, validator)', () => {
    const isNumber = number()

    it('ensures the correct type', () => {
      const num = ensure(3, isNumber)

      assertType<number>(num)
      // @ts-expect-error
      assertType<string>(num)
      // @ts-expect-error
      assertType<number[]>(num)
    })

    it('returns the value in case it is valid', () => {
      const num = 3
      expect(ensure(num, isNumber)).toBe(num)
    })

    it('throws in case the value is invalid', () => {
      expect(() => ensure('test', isNumber)).toThrow()
    })
  })
})

const assertType = <T>(arg: T) => {}
