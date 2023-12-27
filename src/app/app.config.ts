import { HttpClientModule } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations
} from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule, BrowserModule, HttpClientModule])
  ]
};
