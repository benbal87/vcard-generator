export type PartialK<T, K extends PropertyKey = PropertyKey> = Partial<
  Pick<T, Extract<keyof T, K>>
> &
  Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never

export type GeneralObject = Record<string, any>

export type GeneralFunction = (...args: any[]) => any

export type NestedPartialK<
  T,
  K extends PropertyKey = PropertyKey
> = T extends GeneralFunction
  ? T
  : T extends Array<any>
    ? Array<NestedPartialK<T[number], K>>
    : T extends object
      ? PartialK<{ [P in keyof T]: NestedPartialK<T[P], K> }, K>
      : T

export type NonEmptyArray<T> = [T, ...T[]]

export type NonEmpty2dArray<T> = [T, ...T[]][]

export enum DateFormats {
  ISO_8601_DATE = 'YYYY-MM-DD',
  ISO_8601_DATE_WITH_SLASHES = 'YYYY/MM/DD',
  ISO_8601_DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  UK_DATE = 'DD/MM/YYYY',
  UK_DATE_TIME = 'DD/MM/YYYY HH:mm:ss',
  USA_DATE = 'MM/DD/YYYY',
  USA_DATE_TIME = 'MM/DD/YYYY HH:mm:ss',
  SHORT_DATE = 'MMM D, YY',
  SHORT_DATE_TIME = 'MMM D, YY HH:mm:ss',
  LONG_DATE = 'MMMM DD, YYYY',
  LONG_DATE_TIME = 'MMMM DD, YYYY - HH:mm:ss'
}
