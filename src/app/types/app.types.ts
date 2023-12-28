import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'
import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'
import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'

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

export interface ContactJsonType {
  photoUrl?: string
  name: {
    surname?: string // #1
    firstName: string // #2
    middleName?: string // #3
    prefix?: string // #4
    suffix?: string // #5
  }
  formattedName?: string
  nickName?: string
  phoneNumbers?: {
    types: VCardType3PhoneEnum[]
    phoneNumber: string
  }[]
  addresses?: {
    types: VCardType3AddressEnum[]
    postOfficeBox?: string // 1. the post office box
    extendedAddress?: string // 2. the extended address
    streetAddress: string // 3. the street address
    city: string // 4. the locality (e.g., city)
    state?: string // 5. the region (e.g., state or province)
    postalCode?: string // 6. the postal code
    countryName: string // 7. the country name
  }[]
  emails?: {
    types: VCardType3EmailEnum[]
    email: string
  }[]
  organization?: string
  title?: string
  webpage?: string
  note?: string
}
