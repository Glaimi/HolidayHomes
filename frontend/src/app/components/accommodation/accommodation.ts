import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBed,
  faExpand,
  faLocationDot,
  faImage,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { AccommodationModel } from '../../interfaces/accommodation-model';
import { AccommodationService } from '../../services/accommodation-service';


@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './accommodation.html',
  styleUrls: ['./accommodation.scss']
})
export class Accommodation implements OnInit, OnDestroy {
  accommodationImages: (string|null)[] = [];
  currentImageIndex = 0;
  private imageChangeInterval: ReturnType<typeof setInterval> | undefined;
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

  get totalRooms(): number {
    if (!this._accommodation) return 0;
    return (this._accommodation.numberOfMixedRooms || 0) +
           (this._accommodation.numberOfBedrooms || 0) +
           (this._accommodation.numberOfLivingRooms || 0);
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
            // Process image URLs
            this.accommodationImages = images
              .filter(img => img && img.url)  // Filter out any invalid images
              .map(img => {
                // If the URL is relative, prepend the base URL
                const imageUrl = img.url;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:image')) {
                  // Make sure the URL is properly formatted
                  const baseUrl = 'http://localhost:5152';
                  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
                }
                return imageUrl;
              });

            console.log('Processed image URLs:', this.accommodationImages);
          } else {
            console.log('No images found, using placeholder');
            this.accommodationImages = [this.placeholderImage];
          }
        },
        error: (error) => {
          console.error('Error loading images:', error);
          this.isLoadingImages = false;
          this.imageLoadError = true;
          this.accommodationImages = [this.placeholderImage];
        }
      });
    }
  }
  // Font Awesome Icons
  faLocationDot = faLocationDot;
  faBed = faBed;
  faExpand = faExpand;
  faImage = faImage;
  faDoorOpen = faDoorOpen;

  // Helpful method for converting images manually
  goToImage(index: number): void {
    if (index >= 0 && index < this.accommodationImages.length) {
      this.currentImageIndex = index;
    }
  }

}
