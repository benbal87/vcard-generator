import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3WebpageModelProps {
  webpage: string
}

class VCardType3WebpageModel {
  private _webpage: string

  constructor(args: VCardType3WebpageModelProps) {
    this._webpage = args.webpage
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.WEBPAGE,
      this._webpage
    )
  }

  get webpage(): string {
    return this._webpage
  }

  set webpage(value: string) {
    this._webpage = value
  }
}

export default VCardType3WebpageModel
export { VCardType3WebpageModelProps }
