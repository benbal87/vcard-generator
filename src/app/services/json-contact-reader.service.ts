import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  combineLatestWith,
  finalize,
  map,
  Observable,
  skipWhile,
  Subscription,
  take,
  throwError
} from 'rxjs'
import { z } from 'zod'
import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'
import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'
import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'
import VCardType3Model from '../models/v-card-type3.model'
import { ContactJsonType } from '../types/app.types'
import { isStringNotEmpty } from '../utils/string.util'

@Injectable({
  providedIn: 'root'
})
export class JsonContactReaderService {
  private photoSubscription$!: Subscription
  private photoBase64Subject$ =
    new BehaviorSubject<string | undefined>(undefined)

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

  /*
  * The logic of this function is a little fuzzy now.
  * The starting problem was that I wanted to store only the photo url in the
  * contact data jsons. Because of this, right after the contact data json
  * has been parsed, first I need to get the photo file and second I need to
  * read it, and convert it to a more usable base64 string format.
  * The main problem is with the _readPhotoToBinary function where I am using
  * the readAsDataURL function of the FileReader class, which is async and you
  * have to provide a callback function for the "onload" property which will be
  * called when the file read is ready.
  * I was not able to make it in another way so far, so I just made a class
  * instance subject, called "photoBase64Subject$" and put a next call in the
  * onload callback.
  *
  * So first I have to call the _readContact function which reads the contact
  * data json and then inside that function if there is an actual photo url in
  * the contact data json (because it is optional) I am calling the
  * _readPhotoToBinary to get the base64 of the photo.
  *
  * Else if there is no photo url in the contact data json, I will just call the
  * next function on the photoBase64Subject$ with an empty string.
  *
  * In the getContactData function I am combining the _readContact with the
  * photoBase64Subject$ next call. It was important for me, because I wanted to
  * provide the base64 encoding of the photo in the VCardType3Model class
  * instance in the getContactData function return.
  *
  * In the RXJS map function if the incoming photoBase64 string is actually
  * undefined, that means that the actual base64 string value of the photo has
  * not been sent yet, because if there is no photo in the contact data json,
  * the next function will be called immediately on the photoBase64Subject$
  * with an empty string.
  * So if the photoBase64 is undefined, it means there will be a photo later,
  * so I just want to wait with the skipWhile RXJS function until the photo
  * base64 string arrives, and I can set it to the photoBase64 property of
  * the VCardType3Model class instance.
  * But if it is an empty string, it means the photo is nonexistent, so I can
  * just return the VCardType3Model class instance without any problem.
  *
  * But why was all of this important?
  * Because otherwise at the subscription side of the getContactData function
  * nobody would be able to know if the received VCardType3Model is the final
  * or just the first iteration because the photo has not been read in yet.
  * This is also important for knowing when to call the unsubscribe function so
  * the finalize function here will be able to run. And that is important,
  * because in it there is an unsubscribe call of the photoSubscription$.
  *
  * Maybe it could have been solved more easily with the proper use of RXJS.
  * */
  getContactData(fileUrl: string): Observable<VCardType3Model> {
    return this._readContact(fileUrl).pipe(
      combineLatestWith(this.photoBase64Subject$),
      skipWhile(
        ([_, photoBase64]: [VCardType3Model, string | undefined]): boolean =>
          photoBase64 === undefined
      ),
      take(1),
      map(([vCardModel, photoBase64]: [VCardType3Model, string | undefined]) => {
        if (isStringNotEmpty(photoBase64)) {
          vCardModel.photo = photoBase64
        }
        return vCardModel
      }),
      finalize(() => {
        this.photoSubscription$.unsubscribe()
      })
    )
  }

  private _readContact(fileUrl: string): Observable<VCardType3Model> {
    return this.http.get<ContactJsonType>(fileUrl)
      .pipe(
        map((json: ContactJsonType) => {
          this.contactDataJsonValidator.parse(json)

          const conv: VCardType3Model = new VCardType3Model(json)
          this.vCardType3ModelClassValidator.parse(conv)

          const photoUrl: string | undefined = json.photoUrl
          if (photoUrl) {
            this.photoSubscription$ = this._readPhotoToBinary(photoUrl)
              .subscribe()
          } else {
            this.photoBase64Subject$.next('')
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
            console.error(
              'Image file could not be read: ' + event.target.error.code
            )
            this.photoBase64Subject$.next('')
          }
        }),
        catchError(e => throwError(() => e))
      )
  }
}
