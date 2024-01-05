import _ from 'lodash'
import vCard from 'vcf'
import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3AddressModelProps {
  types: VCardType3AddressEnum[]
  postOfficeBox?: string // 1. the post office box
  extendedAddress?: string // 2. the extended address
  streetAddress: string // 3. the street address
  city: string // 4. the locality (e.g., city)
  state?: string // 5. the region (e.g., state or province)
  postalCode?: string // 6. the postal code
  countryName: string // 7. the country name
}

class VCardType3AddressModel {
  private _types!: VCardType3AddressEnum[]
  private _postOfficeBox?: string
  private _extendedAddress?: string
  private _streetAddress: string
  private _city: string
  private _state?: string
  private _postalCode?: string
  private _countryName: string
  public static readonly TYPE_SORTING: string[] = [
    VCardType3AddressEnum.PREF,
    VCardType3AddressEnum.WORK,
    VCardType3AddressEnum.HOME
  ].map(e => e.toLowerCase())
  public static readonly TYPE_STRINGS = {
    [VCardType3AddressEnum.PREF]: 'Address',
    [VCardType3AddressEnum.WORK]: 'Work Address',
    [VCardType3AddressEnum.HOME]: 'Home Address'
  }

  constructor(args: VCardType3AddressModelProps) {
    this.types = args.types
    this._postOfficeBox = args.postOfficeBox
    this._extendedAddress = args.extendedAddress
    this._streetAddress = args.streetAddress
    this._city = args.city
    this._state = args.state
    this._postalCode = args.postalCode
    this._countryName = args.countryName
  }

  get vcardProperty(): vCard.Property {
    return new vCard.Property(
      VCardType3KeysEnum.ADDRESS,
      [
        this.postOfficeBox ?? '',
        this.extendedAddress ?? '',
        this.streetAddress ?? '',
        this.city ?? '',
        this.state ?? '',
        this.postalCode ?? '',
        this.countryName ?? ''
      ].join(';'),
      { type: this.types }
    )
  }

  get types(): VCardType3AddressEnum[] {
    return this._types
  }

  set types(value: VCardType3AddressEnum[]) {
    let types = value
    if (value.length > 1) {
      types = Array.from(new Set(_.cloneDeep(value)))
      types.sort(
        (a, b): number =>
          VCardType3AddressModel.TYPE_SORTING.indexOf(a.toLowerCase()) -
          VCardType3AddressModel.TYPE_SORTING.indexOf(b.toLowerCase()))
    }
    this._types = types
  }

  get postOfficeBox(): string | undefined {
    return this._postOfficeBox
  }

  set postOfficeBox(value: string) {
    this._postOfficeBox = value
  }

  get extendedAddress(): string | undefined {
    return this._extendedAddress
  }

  set extendedAddress(value: string) {
    this._extendedAddress = value
  }

  get streetAddress(): string {
    return this._streetAddress
  }

  set streetAddress(value: string) {
    this._streetAddress = value
  }

  get city(): string {
    return this._city
  }

  set city(value: string) {
    this._city = value
  }

  get state(): string | undefined {
    return this._state
  }

  set state(value: string) {
    this._state = value
  }

  get postalCode(): string | undefined {
    return this._postalCode
  }

  set postalCode(value: string) {
    this._postalCode = value
  }

  get countryName(): string {
    return this._countryName
  }

  set countryName(value: string) {
    this._countryName = value
  }

  get formattedAddress(): string {
    return [
      ...(this.streetAddress ? [this.streetAddress] : []),
      ...(this.extendedAddress ? [this.extendedAddress] : []),
      ...(this.city ? [this.city] : []),
      ...(this.state ? [this.state] : []),
      ...(this.countryName ? [this.countryName] : []),
      ...(this.postalCode ? [this.postalCode] : [])
    ].join(', ')
  }

  get typeToString(): string {
    const firstType =
      this.types.find(t => t !== VCardType3AddressEnum.PREF)
    return firstType
      ? VCardType3AddressModel.TYPE_STRINGS[firstType]
      : VCardType3AddressModel.TYPE_STRINGS[VCardType3AddressEnum.PREF]
  }
}

export default VCardType3AddressModel
export { VCardType3AddressModelProps }
