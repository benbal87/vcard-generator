import { GeneralFunction } from '../types/app.types'

export const isNotEmpty = <T>(item: T | undefined | null): item is T => {
  let result = false
  if (!isNil(item)) {
    if (isIterable(item)) {
      // @ts-ignore
      result = item['length'] > 0 || item['size'] > 0
    } else if (isObject(item)) {
      // @ts-ignore
      result = Object.keys(item).length > 0 || item.valueOf?.() > 0
    } else if (typeof item === 'number') {
      result = !isNaN(item)
    } else {
      result = true
    }
  }
  return result
}

export const isNil = (arg: any): arg is null | undefined =>
  arg === null || arg === undefined

export const isZero = (value: any) =>
  value === null ||
  value === undefined ||
  value === '' ||
  value === '0' ||
  value === 0 ||
  value === '0%' ||
  value === '0 %' ||
  (value?.includes?.('NaN') ?? false) ||
  (value?.startsWith?.('0 ') ?? false)

export const isBoolean = (arg: any): arg is boolean => typeof arg === 'boolean'

export const isFunction = (arg: any): arg is GeneralFunction =>
  typeof arg === 'function'

export const isIterable = (arg: any): boolean =>
  typeof arg?.[Symbol.iterator] === 'function'

export const isString = (arg: any): arg is string =>
  typeof arg === 'string' || arg instanceof String

export const isNumber = (arg: any): arg is number => Number.isFinite(arg)

export const isObject = (arg: any): arg is Record<string, unknown> =>
  typeof arg === 'object' && arg?.constructor === Object

export const isMap = (arg: any): arg is Map<any, any> =>
  !isNil(arg) &&
  typeof arg === 'object' &&
  Object.getPrototypeOf(arg) === Map.prototype


export const isValidEnum = <T>(
  enumValue: any,
  enumObj: object
): enumValue is T =>
  enumValue &&
  typeof enumObj === 'object' &&
  Object.values(enumObj).includes(enumValue)

export const isHTMLElement = (o: any): o is HTMLElement =>
  typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : !isNil(o) &&
    typeof o === 'object' &&
    o.nodeType === 1 &&
    typeof o.nodeName === 'string'
