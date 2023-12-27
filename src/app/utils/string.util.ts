import { GeneralObject } from '../types/app.types'
import { isString } from './type.util'

export const isStringEmpty = (
  str: any
): str is '' | Exclude<typeof str, string> => !isString(str) || str.length === 0

export const isStringNotEmpty = (str: any): str is string =>
  isString(str) && str.length > 0

export const stringify = ({
  object,
  replacer = (_: string, v: any) => (v === undefined ? 'undefined' : v),
  space
}: {
  object: GeneralObject
  replacer?: (k: string, v: any) => any
  space?: number
}): string => {
  let result = ''
  try {
    result = JSON.stringify(object, replacer, space)
  } catch (error: any) {
    const lines: string =
      'Warning!\n' + 'Error happened while trying to stringify object!\n'
    console.warn(lines, error.message ?? error)
  }
  return result
}

export const capitalizeFirstChar = (input: string): string =>
  isString(input) && input?.length > 0
    ? input.replace(/^./, input[0].toUpperCase())
    : ''
