import _ from 'lodash'
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
  public static readonly TYPE_SORTING: string[] = [
    VCardType3EmailEnum.PREF,
    VCardType3EmailEnum.INTERNET,
    VCardType3EmailEnum.X400
  ].map(e => e.toLowerCase())
  public static readonly TYPE_STRINGS = {
    [VCardType3EmailEnum.PREF]: 'Email Address',
    [VCardType3EmailEnum.INTERNET]: 'Internet',
    [VCardType3EmailEnum.X400]: 'X-400'
  }

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
    let types = value
    if (value.length > 1) {
      types = Array.from(new Set(_.cloneDeep(value)))
      types.sort(
        (a, b): number =>
          VCardType3EmailModel.TYPE_SORTING.indexOf(a.toLowerCase()) -
          VCardType3EmailModel.TYPE_SORTING.indexOf(b.toLowerCase()))
    }
    this._types = types
  }

  get email(): string {
    return this._email
  }

  set email(value: string) {
    this._email = value
  }

  get typeToString(): string {
    const firstType =
      this.types.find(t => t !== VCardType3EmailEnum.PREF)
    return firstType
      ? VCardType3EmailModel.TYPE_STRINGS[firstType]
      : VCardType3EmailModel.TYPE_STRINGS[VCardType3EmailEnum.PREF]
  }
}

export default VCardType3EmailModel
export { VCardType3EmailModelProps }
