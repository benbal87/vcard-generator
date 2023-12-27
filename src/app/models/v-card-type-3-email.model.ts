import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'

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
}

export default VCardType3EmailModel
export { VCardType3EmailModelProps }
