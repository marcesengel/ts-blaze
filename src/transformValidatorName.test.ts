import transformValidatorName from './transformValidatorName'
import { Validator } from './validator'

describe('transformValidatorName', () => {
  it('returns the proper names for given mappings', () => {
    for (const [ input, expectedResult ] of expectedResults) {
      expect(transformValidatorName({ name: input } as Validator<any>)).toBe(expectedResult)
    }
  })
})

const expectedResults: [ string, string ][] = [
  [ 'isHuman', 'human' ],
  [ 'isHumanAddress', 'human address' ],
  [ 'areHumanAddresses', 'human addresses' ]
]
