import { HttpClientModule } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  BrowserAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
      BrowserAnimationsModule,
      BrowserModule,
      HttpClientModule
    ])
  ]
}
