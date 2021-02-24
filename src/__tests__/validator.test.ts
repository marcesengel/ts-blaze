import { number } from '../ts-blaze'

describe('validator', () => {
  describe('satisfies', () => {
    const largerThan10 = jest.fn((number: number) => number > 10)

    const isLargerThan10 = number()
      .satisfies(largerThan10)
    
    beforeEach(() => {
      largerThan10.mockClear()
    })

    test('true', () => {
      const value = 21

      expect(isLargerThan10(value)).toBe(true)
      expect(largerThan10).toHaveBeenCalledTimes(1)
      expect(largerThan10).toHaveBeenCalledWith(value)
    })

    test('false', () => {
      const value = 6

      expect(isLargerThan10(value)).toBe(false)
      expect(largerThan10).toHaveBeenCalledTimes(1)
      expect(largerThan10).toHaveBeenCalledWith(value)
    })

    test('base dependency not met', () => {
      isLargerThan10('test')

      expect(largerThan10).not.toHaveBeenCalled()
    })
  })
})
