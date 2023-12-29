import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3PhotoModelProps {
  photoBase64: string
}

class VCardType3PhotoModel {
  private _photoBase64: string

  constructor(args: VCardType3PhotoModelProps) {
    this._photoBase64 = args.photoBase64
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.PHOTO,
      this._photoBase64,
      { encoding: 'b', type: 'jpg' }
    )
  }

  get photoBase64(): string {
    return this._photoBase64
  }

  set photoBase64(value: string) {
    this._photoBase64 = value
  }
}

export default VCardType3PhotoModel
export { VCardType3PhotoModelProps }
