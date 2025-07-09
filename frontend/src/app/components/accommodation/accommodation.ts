import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
  faImage,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
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

      console.log('Loading images for accommodation ID:', this.accommodation.id);

      this.accommodationService.getAccommodationIdImage(this.accommodation.id).subscribe({
        next: (images) => {
          console.log('Received images:', images);
          this.isLoadingImages = false;

          if (images && images.length > 0) {
            // پڕۆسێسکردنی URL ەکانی وێنەکان - بە سەرنجدانی ستراکچەری API
            this.accommodationImages = images.map(img => {
              // ئەگەر img ئۆبجێکتە و url property هەیە
              if (img && typeof img === 'object' && img.url) {
                const imageUrl = img.url;
                // if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:image')) {
                //   return `http://localhost:5152/${imageUrl.replace(/^\//, '')}`;
                // }
                return imageUrl;
              }
              // ئەگەر img ستڕینگە
              else if (typeof img === 'string') {
                // if (!img.startsWith('http') && !img.startsWith('data:image')) {
                //   return `http://localhost:5152/${img.replace(/^\//, '')}`;
                // }
                return img;
              }
              return null;
            }).filter(img => img && img.trim() !== ''); // لابردنی وێنە بەتاڵەکان

            console.log('Processed image URLs:', this.accommodationImages);
            this.currentImageIndex = 0;
            this.startImageCarousel();
          } else {
            // console.warn('No images found for this accommodation');
            // this.accommodationImages = [];
            // this.imageLoadError = true;
            this.accommodationImages = [this.placeholderImage];
          }
        },
        error: (error) => {
          console.error('Error loading accommodation images:', error);
          this.accommodationImages = [];
          this.isLoadingImages = false;
          this.imageLoadError = true;
        }
      });
    } else {
      console.warn('No accommodation ID available to load images');
      this.accommodationImages = [this.placeholderImage];
      this.imageLoadError = true;
    }
  }

  startImageCarousel(): void {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }

    if (this.accommodationImages.length > 1) {
      this.imageChangeInterval = setInterval(() => {
        this.nextImage();
      }, 5000);
    }
  }

  nextImage(): void {
    if (this.accommodationImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.accommodationImages.length;
    }
  }

  previousImage(): void {
    if (this.accommodationImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.accommodationImages.length) % this.accommodationImages.length;
    }
  }

  onImageError(event: Event) {
    console.error('Error loading image:', event);
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = this.placeholderImage;

    // ئەگەر هەموو وێنەکان شکاون، نیشاندانی پلەیس‌هۆڵدەر
    const visibleImages = this.accommodationImages.filter((_, index) => {
      const img = document.querySelector(`img[data-index="${index}"]`) as HTMLImageElement;
      return img && img.style.display !== this.placeholderImage;
    });

    if (visibleImages.length === 0) {
      this.imageLoadError = true;
    }
  }

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
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  isFavorite = false;

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  // مێسۆدی یاریدەدەر بۆ گۆڕینی وێنەکان بە دەستی
  goToImage(index: number): void {
    if (index >= 0 && index < this.accommodationImages.length) {
      this.currentImageIndex = index;
    }
  }

  // بۆ وەستاندنی کاروسێل کاتێک بەکارهێنەر لەسەر وێنە دەچێت
  pauseCarousel(): void {
    if (this.imageChangeInterval) {
      clearInterval(this.imageChangeInterval);
    }
  }

  // بۆ دەستپێکردنەوەی کاروسێل
  resumeCarousel(): void {
    this.startImageCarousel();
  }

  gotToViewDetails() {
    window.location.href = 'view-details';
  }
}
