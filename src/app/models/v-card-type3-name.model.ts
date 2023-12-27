import vCard from 'vcf'

interface VCardType3NameModelProps {
  surname?: string // #1
  firstName: string // #2
  middleName?: string // #3
  prefix?: string // #4
  suffix?: string // #5
}

class VCardType3NameModel {
  static readonly TYPE: string = 'n'
  static readonly TYPE_FORMATTED_NAME: string = 'fn'
  private _surname?: string
  private _firstName: string
  private _middleName?: string
  private _prefix?: string
  private _suffix?: string

  constructor(args: VCardType3NameModelProps) {
    this._surname = args.surname
    this._firstName = args.firstName
    this._middleName = args.middleName
    this._prefix = args.prefix
    this._suffix = args.suffix
  }

  get vcardProperty(): vCard.Property {
    return new vCard.Property(
      VCardType3NameModel.TYPE,
      [
        this.surname,
        this.firstName,
        this.middleName,
        this.prefix,
        this.suffix
      ].join(';')
    )
  }

  get formattedNameVCardProperty(): vCard.Property {
    return new vCard.Property(
      VCardType3NameModel.TYPE_FORMATTED_NAME,
      this.formattedName
    )
  }

  get formattedName(): string {
    return [
      this.prefix,
      this.firstName,
      this.middleName,
      this.surname,
      this.suffix
    ].join(' ').trim()
  }

  get surname(): string {
    return this._surname ?? ''
  }

  set surname(value: string) {
    this._surname = value
  }

  get firstName(): string {
    return this._firstName
  }

  set firstName(value: string) {
    this._firstName = value
  }

  get middleName(): string {
    return this._middleName ?? ''
  }

  set middleName(value: string) {
    this._middleName = value
  }

  get prefix(): string {
    return this._prefix ?? ''
  }

  set prefix(value: string) {
    this._prefix = value
  }

  get suffix(): string {
    return this._suffix ?? ''
  }

  set suffix(value: string) {
    this._suffix = value
  }
}

export default VCardType3NameModel
export { VCardType3NameModelProps }
