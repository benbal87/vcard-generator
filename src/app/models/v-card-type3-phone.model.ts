import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'

interface VCardType3PhoneModelProps {
  types: VCardType3PhoneEnum[]
  phoneNumber: string
}

class VCardType3PhoneModel {
  private _types: VCardType3PhoneEnum[]
  private _phoneNumber: string

  constructor(args: VCardType3PhoneModelProps) {
    this._types = args.types
    this._phoneNumber = args.phoneNumber
  }
}

export default VCardType3PhoneModel
export { VCardType3PhoneModelProps }
