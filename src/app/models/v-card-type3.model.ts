import VCardType3EmailModel from './v-card-type-3-email.model'
import VCardType3AddressModel from './v-card-type3-address.model'
import VCardType3NameModel from './v-card-type3-name.model'
import VCardType3PhoneModel from './v-card-type3-phone.model'

interface VCardType3ModelProps {
  name: VCardType3NameModel
  formattedName?: string
  nickName?: string
  phoneNumbers: VCardType3PhoneModel[]
  addresses?: VCardType3AddressModel[]
  emails?: VCardType3EmailModel[]
  organization?: string
  title?: string
  webpage?: string
  note?: string
}

class VCardType3Model {
  private _name: VCardType3NameModel
  private _formattedName?: string
  private _nickName?: string
  private _phoneNumbers: VCardType3PhoneModel[]
  private _addresses?: VCardType3AddressModel[]
  private _emails?: VCardType3EmailModel[]
  private _organization?: string
  private _title?: string
  private _webpage?: string
  private _note?: string

  constructor(args: VCardType3ModelProps) {
    this._name = args.name
    this._formattedName = args.formattedName
    this._nickName = args.nickName
    this._phoneNumbers = args.phoneNumbers
    this._addresses = args.addresses
    this._emails = args.emails
    this._organization = args.organization
    this._title = args.title
    this._webpage = args.webpage
    this._note = args.note
  }
}

export default VCardType3Model
export { VCardType3ModelProps }
