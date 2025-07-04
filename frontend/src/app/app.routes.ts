import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Imprint} from './components/imprint/imprint';
import {AccomodationList} from './components/accomodation-list/accomodation-list';
import {DataPrivacy} from './components/data.privacy/data.privacy';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page'
  },
  {
    path: 'imprint',
    component: Imprint,
    title: 'Imprint'
  },
  {
    path: 'accomodation-list',
    component: AccomodationList,
    title: 'Accomodation List'
  },
  {
    path: 'data.privacy',
    component: DataPrivacy,
    title: 'Data Privacy'
  },
  {
    path: '**', redirectTo: '',
  }

];
