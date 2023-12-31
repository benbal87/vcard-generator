import _ from 'lodash'
import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'
import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'

interface VCardType3PhoneModelProps {
  types: VCardType3PhoneEnum[]
  phoneNumber: string
}

class VCardType3PhoneModel {
  private _types!: VCardType3PhoneEnum[]
  private _phoneNumber: string
  public static readonly TYPE_SORTING: string[] = [
    VCardType3PhoneEnum.PREF,
    VCardType3PhoneEnum.WORK,
    VCardType3PhoneEnum.HOME,
    VCardType3PhoneEnum.CELL,
    VCardType3PhoneEnum.VOICE
  ].map(e => e.toLowerCase())
  public static readonly TYPE_STRINGS = {
    [VCardType3PhoneEnum.PREF]: 'Telephone',
    [VCardType3PhoneEnum.WORK]: 'Work',
    [VCardType3PhoneEnum.HOME]: 'Home',
    [VCardType3PhoneEnum.CELL]: 'Mobile',
    [VCardType3PhoneEnum.VOICE]: 'Telephone'
  }

  constructor(args: VCardType3PhoneModelProps) {
    this.types = args.types
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
    let types = value
    if (value.length > 1) {
      types = Array.from(new Set(_.cloneDeep(value))).sort(
        (a, b): number =>
          VCardType3PhoneModel.TYPE_SORTING.indexOf(a.toLowerCase()) -
          VCardType3PhoneModel.TYPE_SORTING.indexOf(b.toLowerCase()))
    }
    this._types = types
  }

  get phoneNumber(): string {
    return this._phoneNumber
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value
  }

  get typeToString(): string {
    // let result: string =
    //   VCardType3PhoneModel.TYPE_STRINGS[VCardType3PhoneEnum.PREF]
    // const types = this.types
    // for (let i = 0; i < this.types.length; i++) {
    //   const t = types[i]
    //   if (t !== VCardType3PhoneEnum.PREF) {
    //     result = VCardType3PhoneModel.TYPE_STRINGS[t]
    //     break
    //   }
    // }

    const firstNotPrefType =
      this.types.find(t => t !== VCardType3PhoneEnum.PREF)
    return firstNotPrefType
      ? VCardType3PhoneModel.TYPE_STRINGS[firstNotPrefType]
      : VCardType3PhoneModel.TYPE_STRINGS[VCardType3PhoneEnum.PREF]
  }
}

export default VCardType3PhoneModel
export { VCardType3PhoneModelProps }
