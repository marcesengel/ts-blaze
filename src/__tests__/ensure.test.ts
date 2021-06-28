import { ensure, number, object, oneOf, array, string } from '../ts-blaze'

describe('ensure', () => {
  describe('ensure(value, validator) basics', () => {
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

  describe('ensure(value, validator) number satisfies', () => {
    it('without custom message', () => {
      const isOverFive = number().satisfies(val => val > 5)
      expect(() => ensure('test', isOverFive)).toThrow('. needs to be type number.')
      expect(() => ensure(3, isOverFive)).toThrow('. needs to satisfy constraint.')
      expect(ensure(8, isOverFive)).toBe(8)
    })
    it('with custom message', () => {
      const isOverFive = number().satisfies(val => val > 5, 'be over 5')
      expect(() => ensure('test', isOverFive)).toThrow('. needs to be type number.')
      expect(() => ensure(3, isOverFive)).toThrow('. needs to be over 5.')
      expect(ensure(8, isOverFive)).toBe(8)
    })
  })

  describe('ensure(value, validator) string', () => {
    it('json string', () => {
      const isJsonString = string().json()
      expect(() => ensure('test', isJsonString)).toThrow('. needs to be json string.')
      expect(ensure('{}', isJsonString)).toBe('{}')
    })
  })

  describe('ensure(value, validator) number error messages', () => {
    it('type number', () => {
      const isNumber = number()
      expect(() => ensure('test', isNumber)).toThrow('. needs to be type number.')
    })
    it('number literal', () => {
      const isNumberLiteral = number(5)
      expect(() => ensure('test', isNumberLiteral)).toThrow('. needs to equal 5.')
    })
    it('number with constraint', () => {
      const isNumberWithConstraint = number().satisfies(v => v > 5)
      expect(() => ensure(2, isNumberWithConstraint)).toThrow('. needs to satisfy constraint.')
    })
  })

  describe('ensure(value, validator) object error messages', () => {
    it('type object', () => {
      const isObject = object({})
      expect(() => ensure('test', isObject)).toThrow('. needs to be type object.')
      expect(() => ensure([], isObject)).toThrow('. needs to be type object.')
    })
    it('object exact to many keys', () => {
      const isObject = object({}).exact()
      expect(() => ensure({ a: 5 }, isObject)).toThrow('. needs to have exactly 0 keys.')
    })
  })

  describe('ensure(value, validator) complex error messages', () => {
    const isExample = object({
      a: array(
        oneOf(
          [
            number(),
            string().satisfies(v => v.length > 2)
          ]
        )
      )
    })
    it('complex path', () => {
      expect(() => ensure([], isExample)).toThrow('. needs to be type object.')
      expect(() => ensure({}, isExample)).toThrow('.a needs to be type array.')
      expect(() => ensure({ a: [ {} ] }, isExample)).toThrow('.a.0 needs to be type number or be type string.')
      expect(() => ensure({ a: [ '5' ] }, isExample)).toThrow('.a.0 needs to be type number or satisfy constraint.')
    })
  })
})

const assertType = <T>(arg: T) => {}
