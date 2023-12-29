import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'

interface VCardType3OrganizationModelProps {
  organization: string
}

class VCardType3OrganizationModel {
  private _organization: string

  constructor(args: VCardType3OrganizationModelProps) {
    this._organization = args.organization
  }

  get vcardProperty(): vCard.Property | undefined {
    return new vCard.Property(
      VCardType3KeysEnum.ORG,
      this._organization
    )
  }

  get organization(): string {
    return this._organization
  }

  set organization(value: string) {
    this._organization = value
  }
}

export default VCardType3OrganizationModel
export { VCardType3OrganizationModelProps }
