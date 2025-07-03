import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Imprint} from './components/imprint/imprint';

import {AccomodationList} from './components/accomodation-list/accomodation-list';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page'
  },
  {
    path: 'imprint',
    component: Imprint,
    title: 'imprint'
  },
  {
    path: 'accomodation-list',
    component: AccomodationList,
    title: 'accomodation-list'
  },
  {
    path: '**', redirectTo: '',
  }

];
