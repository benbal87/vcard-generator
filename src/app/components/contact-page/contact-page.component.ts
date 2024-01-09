import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatMenuModule } from '@angular/material/menu'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CONTACTS_ASSETS } from '../../constants/app.constants'
import SvgTypes from '../../enums/svg-types.enum'
import VCardType3AddressModel from '../../models/v-card-type3-address.model'
import VCardType3Model from '../../models/v-card-type3.model'
import {
  JsonContactReaderService
} from '../../services/json-contact-reader.service'
import { isArrayNotEmpty } from '../../utils/array.util'
import { isStringNotEmpty } from '../../utils/string.util'
import { LoaderComponent } from '../loader/loader.component'
import { SvgGeneralComponent } from '../svg/svg-general/svg-general.component'
import {
  GOOGLE_MAPS_URL_PATTERN,
  HREF_EMAIL_PREFIX,
  HREF_TEL_PREFIX
} from './contact-page.constants'

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    SvgGeneralComponent,
    LoaderComponent,
    MatMenuModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit, OnDestroy {
  protected readonly isArrayNotEmpty = isArrayNotEmpty
  protected readonly SvgTypes = SvgTypes
  paramsSubscription!: Subscription
  jsonContactReaderServiceSubscription!: Subscription
  isError: boolean = false

  contactId: string | undefined

  contactDataVCardModel: VCardType3Model | undefined

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private jsonContactReaderService: JsonContactReaderService
  ) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.ar.params.subscribe((params: Params) => {
      const contactId = params['contactId']
      this.setContactData(contactId)
    })
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe()
    }
    if (this.jsonContactReaderServiceSubscription) {
      this.jsonContactReaderServiceSubscription.unsubscribe()
    }
  }

  isContactIdValid(contactId: string | undefined = ''): contactId is keyof typeof CONTACTS_ASSETS {
    return contactId in CONTACTS_ASSETS
  }

  setContactData(contactId: string | undefined): void {
    if (this.isContactIdValid(contactId)) {
      this.contactId = contactId
      const contactDataJsonUrl: string = CONTACTS_ASSETS[contactId]
      this.jsonContactReaderServiceSubscription =
        this.jsonContactReaderService.getContactData(contactDataJsonUrl)
          .subscribe({
            next: (vCardModel: VCardType3Model): void => {
              // setTimeout(() => {
              this.contactDataVCardModel = vCardModel
              // }, 3000)
            },
            error: error => {
              console.error(
                'An error occurred while trying to parse contact data',
                error
              )
              this.isError = true
            }
          })
    } else {
      console.log(
        `Given contact id "${contactId}" can not be found. ` +
        'Navigating to 404 page...'
      )
      this.router.navigate(['/404']).then((res: boolean) => {
        console.log('Result of navigating to 404 page:', res)
      })
    }
  }

  getPhoneHref(phoneNumber: string): string {
    return HREF_TEL_PREFIX + phoneNumber
  }

  getPrimaryPhoneHref(): string | undefined {
    const primaryPhoneNumber: string | undefined =
      this.contactDataVCardModel?.primaryPhone?.phoneNumber
    return isStringNotEmpty(primaryPhoneNumber)
      ? this.getPhoneHref(primaryPhoneNumber)
      : undefined
  }

  getEmailHref(email: string): string {
    return HREF_EMAIL_PREFIX + email
  }

  getPrimaryEmailHref(): string | undefined {
    const primaryEmail: string | undefined =
      this.contactDataVCardModel?.primaryEmail?.email
    return isStringNotEmpty(primaryEmail)
      ? this.getEmailHref(primaryEmail)
      : undefined
  }

  getPrimaryAddressFormatted(): string | undefined {
    const primaryAddress: string | undefined =
      this.contactDataVCardModel?.primaryAddress?.formattedAddress
    return isStringNotEmpty(primaryAddress)
      ? primaryAddress
      : undefined
  }

  getPrimaryAddressHref(): string | undefined {
    const address: string | undefined = this.getPrimaryAddressFormatted()
    return address
      ? GOOGLE_MAPS_URL_PATTERN + address
      : undefined
  }

  getAddressHref(address: VCardType3AddressModel): string {
    return GOOGLE_MAPS_URL_PATTERN + address.formattedAddress
  }
}
