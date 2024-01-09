import {
  animate,
  AnimationAnimateMetadata,
  AnimationTriggerMetadata,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations'
import { NgClass, NgStyle } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { isArrayNotEmpty } from '../../utils/array.util'
import { isStringNotEmpty } from '../../utils/string.util'

export const ANIMATION_DURATION = 1000

const BOUNCE_IN_ANIMATION: AnimationAnimateMetadata = animate(
  ANIMATION_DURATION,
  keyframes([
    style({
      offset: 0,
      opacity: 0,
      transform: 'scale(0)'
    }),
    style({
      offset: 0.5,
      opacity: 1,
      transform: 'scale(1.2)'
    }),
    style({
      offset: 0.7,
      opacity: 1,
      transform: 'scale(0.8)'
    }),
    style({
      offset: 1,
      opacity: 1,
      transform: 'scale(1)'
    })
  ])
)
const BOUNCE_OUT_ANIMATION: AnimationAnimateMetadata = animate(
  ANIMATION_DURATION,
  keyframes([
    style({
      offset: 0,
      opacity: 1,
      transform: 'scale(1)'
    }),
    style({
      offset: 0.5,
      opacity: 1,
      transform: 'scale(0.8)'
    }),
    style({
      offset: 0.7,
      opacity: 1,
      transform: 'scale(1.2)'
    }),
    style({
      offset: 1,
      opacity: 0,
      transform: 'scale(0)'
    })
  ])
)

const ANIMATIONS: AnimationTriggerMetadata[] = [
  trigger(
    'symbolState',
    [
      transition(
        `void => *`,
        [BOUNCE_IN_ANIMATION]
      ),
      transition(
        `* => void`,
        [BOUNCE_OUT_ANIMATION]
      )
    ]
  )
]

@Component({
  selector: 'loader',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  animations: ANIMATIONS
})
export class LoaderComponent implements OnInit {
  @Input('style') style?: object
  @Input('class') class?: string | string[]
  @Input('isFullScreen') isFullScreen?: boolean = false
  classList: string[] = []

  ngOnInit(): void {
    this.initClassList()
  }

  private initClassList() {
    this.classList = [
      ...this.getFullScreenClassList(),
      ...(
        isStringNotEmpty(this.class)
          ? [this.class]
          : isArrayNotEmpty(this.class)
            ? this.class
            : []
      )
    ]
  }

  private getFullScreenClassList(): string[] {
    return this.isFullScreen ? ['full-screen'] : []
  }
}
