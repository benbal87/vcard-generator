import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3NoteModelProps {
  note: string
}

class VCardType3NoteModel {
  private _note: string

  constructor(args: VCardType3NoteModelProps) {
    this._note = args.note
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.PHOTO,
      this._note,
      { encoding: 'b', type: 'jpg' }
    )
  }

  get note(): string {
    return this._note
  }

  set note(value: string) {
    this._note = value
  }
}

export default VCardType3NoteModel
export { VCardType3NoteModelProps }
