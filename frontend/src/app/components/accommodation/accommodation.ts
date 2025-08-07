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
  styleUrl: './accommodation.scss'
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
    // Load accommodation images when the component is initialized
    this.loadAccommodationImages();
  }
  ngOnDestroy(): void {
    // Clear the image change interval when the component is destroyed
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }
  @Input() set accommodation(value: AccommodationModel) {
    this._accommodation = value;
    if (value) {
      // Reload accommodation images when the accommodation data changes
      this.loadAccommodationImages();
    }
  }
  get accommodation(): AccommodationModel {
    return this._accommodation;
  }

  get totalRooms(): number {
    if (!this._accommodation) return 0;
    // Calculate the total number of rooms in the accommodation
    return (this._accommodation.numberOfMixedRooms || 0) +
           (this._accommodation.numberOfBedrooms || 0) +
           (this._accommodation.numberOfLivingRooms || 0);
  }
  private _accommodation!: AccommodationModel;

  loadAccommodationImages(): void {
    if (this.accommodation?.id) {
      // Set loading state to true and reset error state
      this.isLoadingImages = true;
      this.imageLoadError = false;

      // Get accommodation images from the service
      this.accommodationService.getAccommodationIdImage(this.accommodation.id).subscribe({
        next: (images) => {
          console.log('Received images:', images);
          // Set loading state to false
          this.isLoadingImages = false;

          if (images && images.length > 0) {
            // Process image URLs
            this.accommodationImages = images
              .filter((img: { url?: string } | null) => img && img.url)  // Filter out any invalid images
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
            // Use a placeholder image if no images are found
            this.accommodationImages = [this.placeholderImage];
          }
        },
        error: (error) => {
          console.error('Error loading images:', error);
          // Set loading state to false and error state to true
          this.isLoadingImages = false;
          this.imageLoadError = true;
          // Use a placeholder image if there is an error
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
    // Check if the index is within the bounds of the image array
    if (index >= 0 && index < this.accommodationImages.length) {
      this.currentImageIndex = index;
    }
  }

}
