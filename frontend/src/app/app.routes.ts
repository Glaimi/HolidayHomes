import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Imprint} from './components/imprint/imprint';
import {AccommodationList} from './components/accommodation-list/accommodation-list';
import {DataPrivacy} from './components/data.privacy/data.privacy';
import {ViewDetails} from './components/view.details/view.details';


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
    path: 'accommodation-list',
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
    component: ViewDetails,
    title: 'View Details'
  },
  {
    path: '**', redirectTo: '',
  }

];
