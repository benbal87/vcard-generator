import { GeneralFunction } from '../types/app.types'
import { isStringEmpty, stringify } from './string.util'
import { isNil } from './type.util'

export const logObject = ({
  item,
  title,
  consoleFn = console.debug
}: {
  item: any
  title?: string
  consoleFn?: GeneralFunction
}): void => {
  const stringToLog = stringify({ object: item })
  if (!isStringEmpty(stringToLog)) {
    consoleFn(`${title ? `${title}:\n` : ''}${stringToLog}`)
  }
}

export const logToConsole = ({
  lines,
  error,
  style = ['font-size: larger;font-weight: bold;', ''],
  consoleFn = console.debug
}: {
  lines: string[]
  error?: any
  style?: string[]
  consoleFn?: GeneralFunction
}) => {
  const header = lines[0]
  const otherLines =
    lines.length > 1 ? '\n' + lines.slice(1, lines.length).join('\n') : ''
  if (!isStringEmpty(header) || !isStringEmpty(otherLines)) {
    consoleFn(`%c${header}%c${otherLines}`, ...style)
  }
  if (!isNil(error)) {
    console.error(error)
  }
}
