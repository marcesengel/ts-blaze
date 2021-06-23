import { Validator } from './ts-blaze'

let pathContext: string[] = []
let errorContext: string[] = []

export const ensureError = (message: string, isValid: boolean): boolean => {
  if (!isValid) {
    errorContext.push(message)
  }
  return isValid
}

export const ensurePath = (path: string|number, isValid: boolean): boolean => {
  if (!isValid) {
    pathContext.push(`${path}`)
  }
  return isValid
}

const ensure = <T>(value: any, validate: Validator<T>): T => {
  pathContext = []
  errorContext = []
  if (!validate(value)) {
    throw new Error(`.${pathContext.reverse().join('.')} needs to ${errorContext.join(' or ')}.`)
  }

  return value
}

export default ensure
