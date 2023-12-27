import vCard from 'vcf'
import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'

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
  static readonly TYPE: string = 'adr'
  private _types: VCardType3AddressEnum[]
  private _postOfficeBox?: string
  private _extendedAddress?: string
  private _streetAddress: string
  private _city: string
  private _state?: string
  private _postalCode?: string
  private _countryName: string

  constructor(args: VCardType3AddressModelProps) {
    this._types = args.types
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
      VCardType3AddressModel.TYPE,
      [
        this.postOfficeBox,
        this.extendedAddress,
        this.streetAddress,
        this.city,
        this.state,
        this.postalCode,
        this.countryName
      ].join(';'),
      { type: this.types }
    )
  }

  get types(): VCardType3AddressEnum[] {
    return this._types
  }

  set types(value: VCardType3AddressEnum[]) {
    this._types = value
  }

  get postOfficeBox(): string {
    return this._postOfficeBox ?? ''
  }

  set postOfficeBox(value: string) {
    this._postOfficeBox = value
  }

  get extendedAddress(): string {
    return this._extendedAddress ?? ''
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

  get state(): string {
    return this._state ?? ''
  }

  set state(value: string) {
    this._state = value
  }

  get postalCode(): string {
    return this._postalCode ?? ''
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
}

export default VCardType3AddressModel
export { VCardType3AddressModelProps }
