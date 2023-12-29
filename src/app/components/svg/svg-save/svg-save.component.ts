import { NgClass, NgStyle } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'svg-save',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './svg-save.component.html'
})
export class SvgSaveComponent {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('title') title?: string
}
