import { GeneralObject } from '../types/app.types'
import { isObject } from './type.util'

export const filterObjectKeysByList = (
  object: GeneralObject,
  keysToExclude: Array<string> = []
): GeneralObject =>
  isObject(object)
    ? Object.keys(object).reduce(
      (acc, key: string) => ({
        ...acc,
        ...(!keysToExclude.includes(key) && {
          [key]: object[key as keyof typeof object]
        })
      }),
      {}
    )
    : object
