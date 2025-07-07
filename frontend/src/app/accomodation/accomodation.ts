import { Component, Input, OnInit } from '@angular/core';
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
  faLocationDot,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { AccomodationModel } from '../interfaces/accomodation-model';
import { AccomodationService } from '../services/accomodation-service';

@Component({
  selector: 'app-accomodation',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './accomodation.html',
  styleUrl: './accomodation.scss'
})
export class Accomodation implements OnInit {
  accommodationImages: string[] = [];
  currentImageIndex = 0;
  private imageChangeInterval: any;

  constructor(private accommodationService: AccomodationService) {}

  ngOnInit(): void {
    this.loadAccommodationImages();
  }

  loadAccommodationImages(): void {
    if (this.accomodation?.id) {
      console.log('Loading images for accommodation ID:', this.accomodation.id);
      this.accommodationService.getAccomodationIdImage(this.accomodation.id).subscribe({
        next: (images) => {
          console.log('Received images:', images);
          if (images && images.length > 0) {
            // Ensure all URLs are absolute
            this.accommodationImages = images.map(img => {
              // If the image URL is relative, prepend the base URL
              if (img && !img.startsWith('http') && !img.startsWith('data:image')) {
                return `http://localhost:5152/${img.replace(/^\//, '')}`;
              }
              return img;
            });
            console.log('Processed image URLs:', this.accommodationImages);
            this.startImageCarousel();
          } else {
            console.warn('No images found for this accommodation');
            this.accommodationImages = [];
          }
        },
        error: (error) => {
          console.error('Error loading accommodation images:', error);
          this.accommodationImages = [];
        }
      });
    } else {
      console.warn('No accommodation ID available to load images');
      this.accommodationImages = [];
    }
  }

  startImageCarousel(): void {
    if (this.accommodationImages.length > 1) {
      this.imageChangeInterval = setInterval(() => {
        this.nextImage();
      }, 5000);
    }
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.accommodationImages.length;
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.accommodationImages.length) % this.accommodationImages.length;
  }

  ngOnDestroy(): void {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }
  @Input() set accomodation(value: AccomodationModel) {
    this._accomodation = value;
    this.loadAccommodationImages();
  }
  get accomodation(): AccomodationModel {
    return this._accomodation;
  }
  private _accomodation!: AccomodationModel;

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
  faImage = faImage;

  isFavorite = false;

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  onImageError(event: Event) {
    console.error('Error loading image:', event);
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    // Optionally, you could set a placeholder image here
    // imgElement.src = 'path/to/placeholder-image.jpg';
  }
}
