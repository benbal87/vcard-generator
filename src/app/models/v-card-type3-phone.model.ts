import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'
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

  get vcardProperty(): vCard.Property {
    return new vCard.Property(
      VCardType3KeysEnum.PHONE,
      this.phoneNumber,
      { type: this.types }
    )
  }

  get types(): VCardType3PhoneEnum[] {
    return this._types
  }

  set types(value: VCardType3PhoneEnum[]) {
    this._types = value
  }

  get phoneNumber(): string {
    return this._phoneNumber
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value
  }
}

export default VCardType3PhoneModel
export { VCardType3PhoneModelProps }
