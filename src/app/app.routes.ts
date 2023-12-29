import { Routes } from '@angular/router'
import {
  ContactPageComponent
} from './components/contact-page/contact-page.component'
import {
  PageNotFoundComponent
} from './components/page-not-found/page-not-found.component'

export const routes: Routes = [
  {
    path: 'contact/:contactId',
    pathMatch: 'full',
    component: ContactPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
]
