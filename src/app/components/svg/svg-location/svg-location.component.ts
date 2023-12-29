import { NgClass, NgStyle } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'svg-location',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './svg-location.component.html'
})
export class SvgLocationComponent {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string
}
