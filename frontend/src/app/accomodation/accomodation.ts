import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faMapMarkerAlt, 
  faBed, 
  faExpand, 
  faWifi, 
  faParking, 
  faHome,
  faHeart as faSolidHeart,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { AccomodationModel } from '../interfaces/accomodation-model';

@Component({
  selector: 'app-accomodation',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './accomodation.html',
  styleUrl: './accomodation.scss'
})
export class Accomodation {
  @Input() accomodation!: AccomodationModel;
  
  // Font Awesome Icons
  faMapMarkerAlt = faMapMarkerAlt;
  faLocationDot = faLocationDot;
  faBed = faBed;
  faExpand = faExpand;
  faWifi = faWifi;
  faParking = faParking;
  faHome = faHome;
  faSolidHeart = faSolidHeart;
  faRegularHeart = faRegularHeart;
  
  isFavorite = false;
  
  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }
}
