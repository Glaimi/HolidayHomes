import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {BookingService} from '../../services/booking-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import { Calendar } from '../calendar/calendar';

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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  accommodationService: AccommodationService = inject(AccommodationService);
  bookingService: BookingService = inject(BookingService);
  accommodationDetails$: Observable<AccommodationModel | undefined>;
  accommodationImages$:Observable<ImageModel[]>;
  placeholderImage = 'placeholder.jpg';
  accommodationId:number;

  constructor() {
    this.accommodationId = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(this.accommodationId);
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(this.accommodationId);
  }
}
