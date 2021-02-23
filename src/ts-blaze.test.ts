import { object, number, string, array, ensure } from './ts-blaze'

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
      expect(data[0].number).toBe(3)
      expect(data[0].nested.string).toBe('Hello World!')
    }
  })

  describe('ensure(value, validator)', () => {
    const isNumber = number()

    it('returns the value in case it is valid', () => {
      const num = 3
      expect(ensure(num, isNumber)).toBe(num)
    })

    it('throws in case the value is invalid', () => {
      expect(() => ensure('test', isNumber)).toThrow()
    })
  })
})
