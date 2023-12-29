import { CommonModule } from '@angular/common'
import { Component, Input, OnChanges } from '@angular/core'
import SvgTypes from '../../../enums/svg-types.enum'
import { isStringNotEmpty } from '../../../utils/string.util'
import { SvgCallComponent } from '../svg-call/svg-call.component'
import { SvgInternetComponent } from '../svg-internet/svg-internet.component'
import { SvgLocationComponent } from '../svg-location/svg-location.component'
import { SvgMailComponent } from '../svg-mail/svg-mail.component'
import {
  SvgPersonAddComponent
} from '../svg-person-add/svg-person-add.component'
import { SvgSaveComponent } from '../svg-save/svg-save.component'
import { SvgSendComponent } from '../svg-send/svg-send.component'
import { SvgWorkComponent } from '../svg-work/svg-work.component'

@Component({
  standalone: true,
  selector: 'svg-general',
  templateUrl: './svg-general.component.html',
  imports: [
    CommonModule,
    SvgCallComponent,
    SvgMailComponent,
    SvgSendComponent,
    SvgInternetComponent,
    SvgLocationComponent,
    SvgWorkComponent,
    SvgPersonAddComponent,
    SvgSaveComponent
  ],
  styleUrls: ['./svg-general.component.scss']
})
export class SvgGeneralComponent implements OnChanges {
  @Input('type') type!: SvgTypes
  @Input('width') width?: string
  @Input('height') height?: string
  @Input('size') size?: number
  @Input('color') color?: string
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string

  SvgTypes = SvgTypes

  ngOnChanges(): void {
    const size = this.size
      ? {
        width: `${this.size}rem`,
        height: `${this.size}rem`
      }
      : {
        width: this.width,
        height: this.height
      }

    this.style = {
      ...this.style,
      ...size,
      ...(isStringNotEmpty(this.color) ? { fill: this.color } : {})
    }
  }
}
