import { NgClass, NgStyle } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'svg-call',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './svg-call.component.html'
})
export class SvgCallComponent {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string
}
