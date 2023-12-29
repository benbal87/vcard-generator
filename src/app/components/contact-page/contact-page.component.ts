import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { CONTACTS_ASSETS } from '../../constants/app.constants'
import SvgTypes from '../../enums/svg-types.enum'
import VCardType3Model from '../../models/v-card-type3.model'
import {
  JsonContactReaderService
} from '../../services/json-contact-reader.service'
import { SvgGeneralComponent } from '../svg/svg-general/svg-general.component'

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    SvgGeneralComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit, OnDestroy {
  protected readonly SvgTypes = SvgTypes
  paramsSubscription!: Subscription
  jsonContactReaderServiceSubscription!: Subscription
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
              this.contactDataVCardModel = vCardModel
            },
            error: error => {
              console.error(
                'An error occurred while trying to parse contact data',
                error
              )
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
}
