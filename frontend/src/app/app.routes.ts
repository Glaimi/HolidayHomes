import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Imprint} from './components/imprint/imprint';
import {AccommodationList} from './components/accommodation-list/accommodation-list';
import {DataPrivacy} from './components/data.privacy/data.privacy';
import {ViewDetals} from './components/view.detals/view.detals';


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
    component: AccommodationList,
    title: 'Accommodation List'
  },
  {
    path: 'data.privacy',
    component: DataPrivacy,
    title: 'Data Privacy'
  },
  {
    path:'view-details/:id',
    component: ViewDetals,
    title: 'View Details'
  },
  {
    path: '**', redirectTo: '',
  }

];
