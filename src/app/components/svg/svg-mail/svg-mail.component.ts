import { NgClass, NgStyle } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'svg-mail',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './svg-mail.component.html'
})
export class SvgMailComponent {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string
}
