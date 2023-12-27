import vCard from 'vcf'
import { isArrayNotEmpty } from '../utils/array.util'
import { isStringNotEmpty } from '../utils/string.util'
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
  phoneNumbers?: VCardType3PhoneModel[]
  addresses?: VCardType3AddressModel[]
  emails?: VCardType3EmailModel[]
  organization?: string
  title?: string
  webpage?: string
  note?: string
}

class VCardType3Model {
  static readonly TYPE_NICKNAME: string = 'nickname'
  static readonly TYPE_ORG: string = 'org'
  static readonly TYPE_TITLE: string = 'title'
  static readonly TYPE_URL: string = 'url'
  static readonly TYPE_NOTE: string = 'note'
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

  get vcard(): string {
    const getVCardPropArray = (
      arr: Array<VCardType3PhoneModel | VCardType3AddressModel | VCardType3EmailModel> | undefined
    ): Array<vCard.Property> => isArrayNotEmpty(arr)
      ? arr.map(p => p.vcardProperty)
      : []

    const getVCardProperty = (
      fieldType: string,
      fieldValue?: string
    ): vCard.Property | undefined =>
      isStringNotEmpty(fieldValue)
        ? new vCard.Property(fieldType, fieldValue)
        : undefined

    const getVCardWithProps = (...properties: Array<vCard.Property | undefined>): vCard => {
      const vcf: vCard = new vCard()
      vcf.version = '3.0'
      for (let arg of properties) {
        if (arg) {
          vcf.addProperty(arg)
        }
      }
      return vcf
    }

    const name: vCard.Property = this._name.vcardProperty
    const formattedName: vCard.Property = this._name.formattedNameVCardProperty
    const phoneNumbers: Array<vCard.Property> = getVCardPropArray(
      this._phoneNumbers)
    const addresses: Array<vCard.Property> = getVCardPropArray(this._addresses)
    const emails: Array<vCard.Property> = getVCardPropArray(this._emails)

    const nickName: vCard.Property | undefined = getVCardProperty(
      VCardType3Model.TYPE_NICKNAME,
      this.nickName
    )
    const organization: vCard.Property | undefined = getVCardProperty(
      VCardType3Model.TYPE_ORG,
      this.organization
    )
    const title: vCard.Property | undefined = getVCardProperty(
      VCardType3Model.TYPE_TITLE,
      this.title
    )
    const webpage: vCard.Property | undefined = getVCardProperty(
      VCardType3Model.TYPE_URL,
      this.webpage
    )
    const note: vCard.Property | undefined = getVCardProperty(
      VCardType3Model.TYPE_NOTE,
      this.note
    )

    const vcf: vCard = getVCardWithProps(
      name,
      formattedName,
      ...phoneNumbers,
      ...addresses,
      ...emails,
      nickName,
      organization,
      title,
      webpage,
      note,
    )

    return vcf.toString()
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
