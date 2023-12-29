import { NgClass, NgStyle } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'svg-send',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './svg-send.component.html'
})
export class SvgSendComponent {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string
}
