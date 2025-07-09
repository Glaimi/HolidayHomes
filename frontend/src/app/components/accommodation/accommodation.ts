import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBed,
  faExpand,
  faLocationDot,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { AccommodationModel } from '../../interfaces/accommodation-model';
import { AccommodationService } from '../../services/accommodation-service';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.scss'
})
export class Accommodation implements OnInit, OnDestroy {
  accommodationImages: string[] = [];
  currentImageIndex = 0;
  private imageChangeInterval: any;
  isLoadingImages = false;
  imageLoadError = false;
  placeholderImage = 'placeholder.jpg';

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadAccommodationImages();
  }
  ngOnDestroy(): void {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }
  @Input() set accommodation(value: AccommodationModel) {
    this._accommodation = value;
    if (value) {
      this.loadAccommodationImages();
    }
  }
  get accommodation(): AccommodationModel {
    return this._accommodation;
  }
  private _accommodation!: AccommodationModel;

  loadAccommodationImages(): void {
    if (this.accommodation?.id) {
      this.isLoadingImages = true;
      this.imageLoadError = false;

      this.accommodationService.getAccommodationIdImage(this.accommodation.id).subscribe({
        next: (images) => {
          console.log('Received images:', images);
          this.isLoadingImages = false;

          if (images && images.length > 0) {
            // Processing URLs of images - considering the API structure
            this.accommodationImages = images.map(img => {
              // If img is an object and there is a url property
              if (img && typeof img === 'object' && img.url) {
                const imageUrl = img.url;
                if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:image')) {
                  return `http://localhost:5152/${imageUrl.replace(/^\//, '')}`;
                }
                return imageUrl;
              }
            })
          } else {
            this.accommodationImages = [this.placeholderImage];
          }
        }
      });
    }
  }
  // Font Awesome Icons
  faLocationDot = faLocationDot;
  faBed = faBed;
  faExpand = faExpand;
  faImage = faImage;

  // Helpful method for converting images manually
  goToImage(index: number): void {
    if (index >= 0 && index < this.accommodationImages.length) {
      this.currentImageIndex = index;
    }
  }
}


