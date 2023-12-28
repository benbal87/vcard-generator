import { NonEmpty2dArray, NonEmptyArray } from '../types/app.types'
import { isFunction, isNil, isNumber, isZero } from './type.util'

export const isArrayNotEmpty = (arg: any): arg is NonEmptyArray<typeof arg> =>
  Array.isArray(arg) && arg?.length > 0

export const isArrayEmpty = (
  arg: any
): arg is Exclude<typeof arg, any[]> | [] =>
  !Array.isArray(arg) || arg?.length === 0

export const isArrayIncludesNotZeros = (arg: any[]): boolean =>
  isArrayNotEmpty(arg) && arg.some((item: any) => !isZero(item))

export const isArrayFilledWithNotZeros = (arg: any[]): boolean =>
  isArrayNotEmpty(arg) && arg.every((item: any) => !isZero(item))

export const isArrayFilledWithZeros = (arg: any[]): boolean =>
  isArrayNotEmpty(arg) && arg.every((item: any) => isZero(item))

export const isArrayIncludesNumberValues = (arg: any[]): boolean =>
  isArrayNotEmpty(arg) && arg.some((item: any) => isNumber(item))

export const is2dArray = (arg: any): arg is NonEmpty2dArray<typeof arg> =>
  isArrayNotEmpty(arg) && arg.every((item: any) => Array.isArray(item))

export const isNumberArray = (arg: any): arg is number[] =>
  isArrayNotEmpty(arg) && arg.every((el: any) => isNumber(el) || isNil(el))

export const isArrayContainsNumbersOnly = (arg: any): arg is number[] =>
  isArrayNotEmpty(arg) && arg.every((el: any) => isNumber(el))

export const getMin = (arr: number[]): number | undefined => {
  let result = undefined
  if (isArrayNotEmpty(arr)) {
    const min = arr.reduce(
      (acc: number, item: number) =>
        isNumber(item) && item < acc ? item : acc,
      Number.POSITIVE_INFINITY
    )
    if (min !== Number.POSITIVE_INFINITY) {
      result = min
    }
  }
  return result
}

export const getMax = (arr: number[]): number | undefined => {
  let result = undefined
  if (isArrayNotEmpty(arr)) {
    const max = arr.reduce(
      (acc: number, item: number) =>
        isNumber(item) && item > acc ? item : acc,
      Number.NEGATIVE_INFINITY
    )
    if (max !== Number.NEGATIVE_INFINITY) {
      result = max
    }
  }
  return result
}

export const sum = (numList: Array<any>): number =>
  numList.reduce((acc: number, item: any) => {
    const itemParsed = parseFloat(item)
    return isNumber(itemParsed) ? acc + itemParsed : acc
  }, 0)

export const sortByAlphabet = (array: Array<string>): void => {
  array.sort((a: string, b: string) => {
    return isFunction(a?.localeCompare) ? a.localeCompare(b) : -1
  })
}

export const getIntersectionOfArrays = (
  data: Array<Array<number | string>> = []
): Array<number | string> => {
  const dataFiltered = data.filter(d => d?.length > 0) ?? []
  return isArrayNotEmpty(dataFiltered)
    ? dataFiltered.length === 1
      ? dataFiltered[0]
      : dataFiltered.reduce((a: Array<any>, b: Array<any>) =>
        a.filter(c => b.includes(c))
      )
    : dataFiltered
}

export const findInsertionIndexInOrderedArray = (
  numbers: Array<number>,
  numberToInsert: number
): number => {
  let result = -1
  if (isArrayNotEmpty(numbers)) {
    const min = getMin(numbers) ?? 0
    const max = getMax(numbers) ?? 0
    if (numberToInsert < min) {
      result = 0
    } else if (numberToInsert > max) {
      result = numbers.length
    } else {
      for (let i = 0; i < numbers.length; i++) {
        if (
          (numberToInsert > numbers[i] && numberToInsert < numbers[i + 1]) ||
          numberToInsert === numbers[i]
        ) {
          result = i + 1
          break
        }
      }
    }
  } else {
    result = 0
  }
  return result
}
