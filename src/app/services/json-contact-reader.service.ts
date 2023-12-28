import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  combineLatestWith,
  map,
  Observable,
  Subscription, takeLast,
  throwError
} from 'rxjs'
import { z } from 'zod'
import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'
import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'
import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'
import VCardType3Model, {
  VCardType3ModelProps
} from '../models/v-card-type3.model'
import { ContactJsonType } from '../types/app.types'
import { filterObjectKeysByList } from '../utils/object.util'

@Injectable({
  providedIn: 'root'
})
export class JsonContactReaderService {
  private photoSubscription$ = new Subscription()
  private photoBase64Subject$ = new BehaviorSubject<string>('')

  vCardType3ModelClassValidator = z.instanceof(VCardType3Model)

  contactDataJsonValidator = z.object({
    photoUrl: z.string().optional(),
    name: z.object({
      surname: z.string().optional(),
      firstName: z.string(),
      middleName: z.string().optional(),
      prefix: z.string().optional(),
      suffix: z.string().optional()
    }),
    nickName: z.string().optional(),
    phoneNumbers: z.array(z.object({
      types: z.array(z.nativeEnum(VCardType3PhoneEnum)),
      phoneNumber: z.string()
    }).required()).optional(),
    addresses: z.array(z.object({
      types: z.array(z.nativeEnum(VCardType3AddressEnum)),
      postOfficeBox: z.string().optional(),
      extendedAddress: z.string().optional(),
      streetAddress: z.string(),
      city: z.string(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      countryName: z.string()
    })).optional(),
    emails: z.array(z.object({
      types: z.array(z.nativeEnum(VCardType3EmailEnum)),
      email: z.string().email()
    }).required()).optional(),
    organization: z.string().optional(),
    title: z.string().optional(),
    webpage: z.string().optional(),
    note: z.string().optional()
  }).strict()

  constructor(private http: HttpClient) {
  }

  getContactData(fileUrl: string): Observable<VCardType3Model> {
    return this._readContact(fileUrl).pipe(
      takeLast(1),
      combineLatestWith(this.photoBase64Subject$),
      map(([vCardModel, photoBase64 = '']: [VCardType3Model, string]) => {
        vCardModel.photoBase64 = photoBase64
        return vCardModel
      }),
      // finalize(() => {
      //   console.log('### unsubscribe')
      //   this.photoSubscription$.unsubscribe()
      // })
    )
  }

  private _readContact(fileUrl: string): Observable<VCardType3Model> {
    return this.http.get<VCardType3Model>(fileUrl)
      .pipe(
        map((json: ContactJsonType) => {
          // const contactDataJsonValidationResult =
          this.contactDataJsonValidator.parse(json)
          // console.log(
          //   'contact data json object validation result',
          //   contactDataJsonValidationResult
          // )

          const jsonConverted: VCardType3ModelProps =
            filterObjectKeysByList(
              json,
              ['photoUrl']
            ) as unknown as VCardType3ModelProps
          const conv: VCardType3Model = new VCardType3Model(jsonConverted)

          // const vcardType3ModelClassValidationResult =
            this.vCardType3ModelClassValidator.parse(conv)
          // console.log(
          //   'VCardType3Model class validation result',
          //   vcardType3ModelClassValidationResult
          // )

          const photoUrl: string | undefined = json.photoUrl
          if (photoUrl) {
            // console.log('photoUrl EXISTS')
            this.photoSubscription$ = this._readPhotoToBinary(photoUrl)
              .subscribe()
          }

          return conv
        }),
        catchError(e => throwError(() => e))
      )
  }

  private _readPhotoToBinary(photoURL: string): Observable<void> {
    return this.http.get(photoURL, { responseType: 'blob' })
      .pipe(
        map((blob: Blob) => {
          const reader: FileReader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = (event: any) => {
            const b64 = event.target.result
            this.photoBase64Subject$.next(b64)
          }
          reader.onerror = (event: any) => {
            console.error('File could not be read: ' + event.target.error.code)
          }
        }),
        catchError(e => throwError(() => e))
      )
  }
}
