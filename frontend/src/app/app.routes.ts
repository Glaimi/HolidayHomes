import { Routes } from '@angular/router';
import {AccomodationList}  from './components/accomodation-list/accomodation-list';

export const routes: Routes = [
  {
    path: 'accomodation-list',
    component: AccomodationList,
    title: 'list of accomodaions'
  }
];
