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
}

export default VCardType3AddressModel
export { VCardType3AddressModelProps }
