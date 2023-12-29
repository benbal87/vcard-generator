import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3TitleModelProps {
  title: string
}

class VCardType3TitleModel {
  private _title: string

  constructor(args: VCardType3TitleModelProps) {
    this._title = args.title
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.TITLE,
      this._title,
    )
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }
}

export default VCardType3TitleModel
export { VCardType3TitleModelProps }
