import { isArrayNotEmpty } from './array.util'
import { logToConsole } from './log.util'
import { isStringNotEmpty } from './string.util'
import { isNotEmpty } from './type.util'

export const getStringMap = (map: Map<any, any> | undefined): string => {
  let result: any[] = []
  if (map instanceof Map && isNotEmpty(map)) {
    result = Array.from(map.entries())
  }
  return JSON.stringify(result)
}

/*
 * need to provide a 2d array string representation of
 * a javascript map object
 * */
export const getParsedMap = (strMap: string | undefined) => {
  let result: Map<any, any> = new Map()
  if (isStringNotEmpty(strMap)) {
    try {
      const parsedMapRaw: Array<any> = JSON.parse(strMap)
      if (
        isArrayNotEmpty(parsedMapRaw) &&
        parsedMapRaw.every(el => isArrayNotEmpty(el) && el.length === 2)
      ) {
        result = new Map(parsedMapRaw)
      } else {
        logToConsole({
          lines: [
            'Error in parse!',
            'Error occurred while trying to parse string map object!',
            'String can not be parsed to map!',
            `Function argument: "${strMap}"`
          ]
        })
      }
    } catch (error) {
      logToConsole({
        lines: [
          'Error in parse!',
          'Error occurred while trying to parse string map object!',
          `Function argument: "${strMap}"`
        ],
        error,
        consoleFn: console.error
      })
    }
  }
  return result
}
