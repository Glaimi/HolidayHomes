import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {BookingService} from '../../services/booking-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import { Calendar } from '../calendar/calendar';

// This component is responsible for displaying accommodation details.
@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DecimalPipe,
    DatePipe,
    Calendar
  ],
  templateUrl: './accommodation-details.html',
  standalone: true,
  styleUrl: './accommodation-details.scss'
})
export class AccommodationDetails {
  // Inject the ActivatedRoute to access route parameters.
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  // Inject the AccommodationService to fetch accommodation data.
  accommodationService: AccommodationService = inject(AccommodationService);
  // Inject the BookingService to handle booking-related operations.
  bookingService: BookingService = inject(BookingService);
  // Observable to store accommodation details.
  accommodationDetails$: Observable<AccommodationModel | undefined>;
  // Observable to store accommodation images.
  accommodationImages$:Observable<ImageModel[]>;
  // Placeholder image URL.
  placeholderImage = 'placeholder.jpg';
  // Store the accommodation ID from route parameters.
  accommodationId:number;

  constructor() {
    // Get the accommodation ID from route parameters.
    this.accommodationId = this.route.snapshot.params['id'];
    // Fetch accommodation details using the AccommodationService.
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(this.accommodationId);
    // Fetch accommodation images using the AccommodationService.
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(this.accommodationId);
  }
}
