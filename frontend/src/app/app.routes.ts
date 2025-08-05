import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Imprint} from './components/imprint/imprint';
import {AccommodationList} from './components/accommodation-list/accommodation-list';
import {Privacy} from './components/privacy/privacy';
import {AccommodationDetails} from './components/accommodation-details/accommodation-details';
import {ManageAvailability} from './components/manage-availability/manage-availability';


export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Startseite'
  },
  {
    path: 'imprint',
    component: Imprint,
    title: 'Impressum'
  },
  {
    path: 'accommodation-list',
    component: AccommodationList,
    title: 'Liste der Unterkünfte'
  },
  {
    path: 'privacy',
    component: Privacy,
    title: 'Datenschutz'
  },
  {
    path:'view-details/:id',
    component: AccommodationDetails,
    title: 'Details anzeigen'
  },
  {
    path:'manageAvailability',
    component: ManageAvailability,
    title: 'Verfügbarkeit verwalten'
  },
  {
    path: '**', redirectTo: '',
  }
];
