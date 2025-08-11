import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {BookingService} from '../../services/booking-service';
import {AccommodationModel, SeasonPricingCalculate} from '../../interfaces/accommodation-model';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import { Calendar } from '../calendar/calendar';

// This component is responsible for displaying accommodation details.
@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    DecimalPipe,
    Calendar
  ],
  templateUrl: './accommodation-details.html',
  standalone: true,
  styleUrl: './accommodation-details.scss'
})
export class AccommodationDetails implements OnInit{
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

  //SeasonPrisingCalculate$: Observable<SeasonPrisingCalculate[]>;

  seasonPricingData: SeasonPricingCalculate[] = [];

  selectedStartDay?: number;
  selectedStartMonth?: number;
  selectedEndDay?: number;
  selectedEndMonth?: number;

  constructor() {
    // Get the accommodation ID from route parameters.
    this.accommodationId = this.route.snapshot.params['id'];
    // Fetch accommodation details using the AccommodationService.
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(this.accommodationId);
    // Fetch accommodation images using the AccommodationService.
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(this.accommodationId);
    //this.SeasonPrisingCalculate$ = this.accommodationService.getCalculatedPrice(this.accommodationId);

  }

  ngOnInit(): void {
    // this.accommodationService.getCalculatedPrice(this.accommodationId)
    //   .subscribe(data => this.seasonPricingData = data);
  }
  onDateRangeSelected(range: {startDay: number, startMonth: number, endDay: number, endMonth: number}) {
    this.selectedStartDay = range.startDay;
    this.selectedStartMonth = range.startMonth;
    this.selectedEndDay = range.endDay;
    this.selectedEndMonth = range.endMonth;
  }

  calculateNumberOfNights(
    startDay: number | undefined,
    startMonth: number | undefined,
    endDay: number | undefined,
    endMonth: number | undefined
  ): number {
    const safeStartDay = startDay ?? 1;
    const safeStartMonth = startMonth ?? 1;
    const safeEndDay = endDay ?? 1;
    const safeEndMonth = endMonth ?? 1;

    const startDate = new Date(2025, safeStartMonth - 1, safeStartDay);
    let endDate = new Date(2025, safeEndMonth - 1, safeEndDay);

    // If the end date is before start date, assume it's in the next year
    if (endDate < startDate) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const diffInMs = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return nights;
  }

  get totalNights(): number {
    return this.calculateNumberOfNights(
      this.selectedStartDay,
      this.selectedStartMonth,
      this.selectedEndDay,
      this.selectedEndMonth
    );
  }


}



