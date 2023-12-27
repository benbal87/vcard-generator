import { isArrayNotEmpty } from '../utils/array.util'
import VCardType3EmailModel, {
  VCardType3EmailModelProps
} from './v-card-type-3-email.model'
import VCardType3AddressModel, {
  VCardType3AddressModelProps
} from './v-card-type3-address.model'
import VCardType3NameModel, {
  VCardType3NameModelProps
} from './v-card-type3-name.model'
import VCardType3PhoneModel, {
  VCardType3PhoneModelProps
} from './v-card-type3-phone.model'

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
  private _phoneNumbers?: VCardType3PhoneModel[]
  private _addresses?: VCardType3AddressModel[]
  private _emails?: VCardType3EmailModel[]
  private _organization?: string
  private _title?: string
  private _webpage?: string
  private _note?: string

  constructor(args: VCardType3ModelProps) {
    this._name
      = new VCardType3NameModel(args.name as unknown as VCardType3NameModelProps)
    this._formattedName = args.formattedName
    this._nickName = args.nickName
    this._phoneNumbers = isArrayNotEmpty(args.phoneNumbers)
      ? args.phoneNumbers.map((pn: any) => new VCardType3PhoneModel(pn as unknown as VCardType3PhoneModelProps))
      : undefined
    this._addresses = isArrayNotEmpty(args.addresses)
      ? args.addresses.map((a: any) => new VCardType3AddressModel(a as unknown as VCardType3AddressModelProps))
      : undefined
    this._emails = isArrayNotEmpty(args.emails)
      ? args.emails.map((e: any) => new VCardType3EmailModel(e as unknown as VCardType3EmailModelProps))
      : undefined
    this._organization = args.organization
    this._title = args.title
    this._webpage = args.webpage
    this._note = args.note
  }

  get name(): VCardType3NameModel {
    return this._name
  }

  set name(value: VCardType3NameModel) {
    this._name = value
  }

  get formattedName(): string | undefined {
    return this._formattedName
  }

  set formattedName(value: string) {
    this._formattedName = value
  }

  get nickName(): string | undefined {
    return this._nickName
  }

  set nickName(value: string) {
    this._nickName = value
  }

  get phoneNumbers(): VCardType3PhoneModel[] | undefined {
    return this._phoneNumbers
  }

  set phoneNumbers(value: VCardType3PhoneModel[]) {
    this._phoneNumbers = value
  }

  get addresses(): VCardType3AddressModel[] | undefined {
    return this._addresses
  }

  set addresses(value: VCardType3AddressModel[]) {
    this._addresses = value
  }

  get emails(): VCardType3EmailModel[] | undefined {
    return this._emails
  }

  set emails(value: VCardType3EmailModel[]) {
    this._emails = value
  }

  get organization(): string | undefined {
    return this._organization
  }

  set organization(value: string) {
    this._organization = value
  }

  get title(): string | undefined {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get webpage(): string | undefined {
    return this._webpage
  }

  set webpage(value: string) {
    this._webpage = value
  }

  get note(): string | undefined {
    return this._note
  }

  set note(value: string) {
    this._note = value
  }
}

export default VCardType3Model
export { VCardType3ModelProps }
