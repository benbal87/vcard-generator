import vCard from 'vcf'
import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3EmailModelProps {
  types: VCardType3EmailEnum[]
  email: string
}

class VCardType3EmailModel {
  private _types: VCardType3EmailEnum[]
  private _email: string

  constructor(args: VCardType3EmailModelProps) {
    this._types = args.types
    this._email = args.email
  }

  get vcardProperty(): vCard.Property {
    return new vCard.Property(
      VCardType3KeysEnum.EMAIL,
      this.email,
      { type: this.types }
    )
  }

  get types(): VCardType3EmailEnum[] {
    return this._types
  }

  set types(value: VCardType3EmailEnum[]) {
    this._types = value
  }

  get email(): string {
    return this._email
  }

  set email(value: string) {
    this._email = value
  }
}

export default VCardType3EmailModel
export { VCardType3EmailModelProps }
