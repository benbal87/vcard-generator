import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3NicknameModelProps {
  nickname: string
}

class VCardType3NicknameModel {
  private _nickname: string

  constructor(args: VCardType3NicknameModelProps) {
    this._nickname = args.nickname
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.NICKNAME,
      this._nickname
    )
  }

  get nickname(): string {
    return this._nickname
  }

  set nickname(value: string) {
    this._nickname = value
  }
}

export default VCardType3NicknameModel
export { VCardType3NicknameModelProps }
