import vCard from 'vcf'
import { ContactJsonType } from '../types/app.types'
import { isArrayNotEmpty } from '../utils/array.util'
import { isStringNotEmpty } from '../utils/string.util'
import VCardType3AddressModel, {
  VCardType3AddressModelProps
} from './v-card-type3-address.model'
import VCardType3EmailModel, {
  VCardType3EmailModelProps
} from './v-card-type3-email.model'
import VCardType3NameModel, {
  VCardType3NameModelProps
} from './v-card-type3-name.model'
import VCardType3NicknameModel from './v-card-type3-nickname.model'
import VCardType3NoteModel from './v-card-type3-note.model'
import VCardType3OrganizationModel from './v-card-type3-organization.model'
import VCardType3PhoneModel, {
  VCardType3PhoneModelProps
} from './v-card-type3-phone.model'
import VCardType3PhotoModel from './v-card-type3-photo.model'
import VCardType3TitleModel from './v-card-type3-title.model'
import VCardType3WebpageModel from './v-card-type3-webpage.model'

class VCardType3Model {
  private _name!: VCardType3NameModel
  private _addresses?: VCardType3AddressModel[]
  private _emails?: VCardType3EmailModel[]
  private _phoneNumbers?: VCardType3PhoneModel[]
  private _photo?: VCardType3PhotoModel
  private _nickname?: VCardType3NicknameModel
  private _organization?: VCardType3OrganizationModel
  private _title?: VCardType3TitleModel
  private _webpage?: VCardType3WebpageModel
  private _note?: VCardType3NoteModel

  constructor(args: ContactJsonType) {
    this.name = args.name
    this.addresses = args.addresses
    this.emails = args.emails
    this.phoneNumbers = args.phoneNumbers
    this.photo = args.photoBase64
    this.nickname = args.nickName
    this.organization = args.organization
    this.title = args.title
    this.webpage = args.webpage
    this.note = args.note
  }

  get vcard(): string {
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

    const vcf: vCard = getVCardWithProps(
      this.name.vcardProperty,
      this.name.formattedNameVCardProperty,
      ...(this.addresses ?? []).map(a => a.vcardProperty),
      ...(this.emails ?? []).map(e => e.vcardProperty),
      ...(this.phoneNumbers ?? []).map(p => p.vcardProperty),
      this.photo?.vcardProperty,
      this.nickname?.vcardProperty,
      this.organization?.vcardProperty,
      this.title?.vcardProperty,
      this.webpage?.vcardProperty,
      this.note?.vcardProperty
    )

    return vcf.toString()
  }

  get name(): VCardType3NameModel {
    return this._name
  }

  set name(value: ContactJsonType['name']) {
    this._name = new VCardType3NameModel(
      value as unknown as VCardType3NameModelProps
    )
  }

  get addresses(): VCardType3AddressModel[] | undefined {
    return this._addresses
  }

  set addresses(addresses: ContactJsonType['addresses'] | undefined) {
    if (isArrayNotEmpty(addresses)) {
      this._addresses =
        addresses.map((e: any) =>
          new VCardType3AddressModel(e as unknown as VCardType3AddressModelProps)
        )
    }
  }

  get emails(): VCardType3EmailModel[] | undefined {
    return this._emails
  }

  set emails(emails: ContactJsonType['emails'] | undefined) {
    if (isArrayNotEmpty(emails)) {
      this._emails =
        emails.map((e: any) =>
          new VCardType3EmailModel(e as unknown as VCardType3EmailModelProps)
        )
    }
  }

  get phoneNumbers(): VCardType3PhoneModel[] | undefined {
    return this._phoneNumbers
  }

  set phoneNumbers(phoneNumbers: ContactJsonType['phoneNumbers'] | undefined) {
    if (isArrayNotEmpty(phoneNumbers)) {
      this._phoneNumbers =
        phoneNumbers.map((e: any) =>
          new VCardType3PhoneModel(e as unknown as VCardType3PhoneModelProps)
        )
    }
  }

  get photo(): VCardType3PhotoModel | undefined {
    return this._photo
  }

  set photo(photoBase64: string | undefined) {
    if (isStringNotEmpty(photoBase64)) {
      this._photo = new VCardType3PhotoModel({ photoBase64 })
    }
  }

  get nickname(): VCardType3NicknameModel | undefined {
    return this._nickname
  }

  set nickname(nickname: string | undefined) {
    if (isStringNotEmpty(nickname)) {
      this._nickname = new VCardType3NicknameModel({ nickname })
    }
  }

  get organization(): VCardType3OrganizationModel | undefined {
    return this._organization
  }

  set organization(organization: string | undefined) {
    if (isStringNotEmpty(organization)) {
      this._organization = new VCardType3OrganizationModel({ organization })
    }
  }

  get title(): VCardType3TitleModel | undefined {
    return this._title
  }

  set title(title: string | undefined) {
    if (isStringNotEmpty(title)) {
      this._title = new VCardType3TitleModel({ title })
    }
  }

  get webpage(): VCardType3WebpageModel | undefined {
    return this._webpage
  }

  set webpage(webpage: string | undefined) {
    if (isStringNotEmpty(webpage)) {
      this._webpage = new VCardType3WebpageModel({ webpage })
    }
  }

  get note(): VCardType3NoteModel | undefined {
    return this._note
  }

  set note(note: string | undefined) {
    if (isStringNotEmpty(note)) {
      this._note = new VCardType3NoteModel({ note })
    }
  }
}

export default VCardType3Model
