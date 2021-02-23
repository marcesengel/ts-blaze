import { Validator } from './validator'

export default ({ name }: Validator<any>): string => {
  const splitByCamelCase: string[] = []
  for (let i = 0; i < name.length; i++) {
    const char = name.charAt(i)
    const lowerCase = char.toLocaleLowerCase()

    if (char !== lowerCase) {
      splitByCamelCase.push('')
    }

    splitByCamelCase[splitByCamelCase.length - 1] += lowerCase
  }

  return splitByCamelCase
    .filter(word => !wordsToBeStripped.includes(word))
    .join(' ')
}

const wordsToBeStripped = [ 'is', 'are' ]
