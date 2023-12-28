import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, throwError } from 'rxjs'
import { z } from 'zod'
import VCardType3AddressEnum from '../enums/v-card-type3-address-types.enum'
import VCardType3EmailEnum from '../enums/v-card-type3-email.enum'
import VCardType3PhoneEnum from '../enums/v-card-type3-phone.enum'
import VCardType3Model, {
  VCardType3ModelProps
} from '../models/v-card-type3.model'

@Injectable({
  providedIn: 'root'
})
export class JsonContactReaderService {

  vCardType3ModelClassValidator = z.instanceof(VCardType3Model)

  vCardType3ModelValidator = z.object({
    name: z.object({
      surname: z.string().optional(),
      firstName: z.string(),
      middleName: z.string().optional(),
      prefix: z.string().optional(),
      suffix: z.string().optional()
    }),
    // formattedName: z.string(),
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

  readContact(fileUrl: string): Observable<VCardType3Model> {
    return this.http.get<VCardType3Model>(fileUrl)
      .pipe(
        map((json: object) => {
          const rawObjectValidationResult = this.vCardType3ModelValidator.parse(
            json)
          console.log(
            'raw VCardType3Model object validation result',
            rawObjectValidationResult
          )
          const conv: VCardType3Model = new VCardType3Model(json as unknown as VCardType3ModelProps)
          const vcardType3ModelClassValidationResult = this.vCardType3ModelClassValidator.parse(
            conv)
          console.log(
            'VCardType3Model class validation result',
            vcardType3ModelClassValidationResult
          )
          return conv
        }),
        catchError(e => throwError(() => e))
        // tap(r => {
        //   console.log('tap', r)
        // })
      )
  }
}
