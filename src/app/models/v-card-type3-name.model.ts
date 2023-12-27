interface VCardType3NameModelProps {
  surname?: string // #1
  firstName: string // #2
  middleName?: string // #3
  prefix?: string // #4
  suffix?: string // #5
}

class VCardType3NameModel {
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
}

export default VCardType3NameModel
export { VCardType3NameModelProps }
