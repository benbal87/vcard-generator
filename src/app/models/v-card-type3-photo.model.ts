import vCard from 'vcf'
import VCardType3KeysEnum from '../enums/v-card-type3-keys.enum'
import VCardType3PhotoEnum from '../enums/v-card-type3-photo.enum'
import { isStringNotEmpty } from '../utils/string.util'
import { isValidEnum } from '../utils/type.util'

interface VCardType3PhotoModelProps {
  photoBase64: string
}

class VCardType3PhotoModel {
  private static readonly BASE64_REGEX: RegExp =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
  private static readonly BASE64_ENCODING_KEY = 'b'
  private _photoBase64: string

  constructor(args: VCardType3PhotoModelProps) {
    this._photoBase64 = args.photoBase64
  }

  validate(): boolean {
    return this.validatePhotoBase64String(this.photoBase64)
  }

  validatePhotoBase64String(b64: string | undefined): boolean {
    let result: boolean = false
    if (isStringNotEmpty(b64)) {
      const [
        dataPart,
        imageTypePart,
        encodingTypePart,
        b64StrPart
      ]: string[] = b64.split(/[:;,]+/)
      // data:image/jpeg;base64,iVBORw0 => [data, image/jpeg, base64, iVBORw0]

      const isData: boolean = dataPart === 'data'

      const typeParts: string[] = imageTypePart.split('/')
      const isValidImageType: boolean =
        typeParts[0] === 'image' && this.isPhotoTypeValid(typeParts[1])

      const isBase64: boolean =
        encodingTypePart === 'base64'
        && VCardType3PhotoModel.BASE64_REGEX.test(b64StrPart)

      if (isData && isValidImageType && isBase64) {
        result = true
      }
    }
    return result
  }

  isPhotoTypeValid(photoType: any): photoType is VCardType3PhotoEnum {
    return isValidEnum<VCardType3PhotoEnum>(photoType, VCardType3PhotoEnum)
  }

  getPhotoType(b64: string): VCardType3PhotoEnum | undefined {
    const photoType: string = (isStringNotEmpty(b64) ? b64 : '').split(
      /[:\/;,]+/)[2]
    return this.isPhotoTypeValid(photoType) ? photoType : undefined
  }

  get vcardProperty(): vCard.Property | undefined {
    const validationResult: boolean =
      this.validatePhotoBase64String(this.photoBase64)
    const photoType: VCardType3PhotoEnum | undefined =
      this.getPhotoType(this.photoBase64)

    return validationResult && photoType
      ? new vCard.Property(
        VCardType3KeysEnum.PHOTO,
        this.photoBase64.split(',')[1],
        {
          encoding: VCardType3PhotoModel.BASE64_ENCODING_KEY,
          type: photoType
        }
      )
      : undefined
  }

  get photoBase64(): string {
    return this._photoBase64
  }

  set photoBase64(value: string) {
    this._photoBase64 = value
  }
}

export default VCardType3PhotoModel
export { VCardType3PhotoModelProps }
