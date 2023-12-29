import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import SvgTypes from '../../enums/svg-types.enum'
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
  paramsSubscription!: Subscription
  contactId: string | undefined

  constructor(private ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.ar.params.subscribe((params: Params) => {
      this.contactId = params['contactId']
    })
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe()
    }
  }

  protected readonly SvgTypes = SvgTypes
}
