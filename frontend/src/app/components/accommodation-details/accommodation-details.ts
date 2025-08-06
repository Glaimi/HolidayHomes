import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel, SeasonPrisingCalculate} from '../../interfaces/accommodation-model';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';


@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DecimalPipe,

  ],
  templateUrl: './accommodation-details.html',
  standalone: true,
  styleUrl: './accommodation-details.scss'
})
export class AccommodationDetails {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  accommodationService: AccommodationService = inject(AccommodationService);
  accommodationDetails$: Observable<AccommodationModel | undefined>;
  accommodationImages$:Observable<ImageModel[]>;
  placeholderImage = 'placeholder.jpg';

  seasonPricingCurrent$: Observable<SeasonPrisingCalculate[]>;

  constructor() {
    const id: number = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(id);
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(id);
    this.seasonPricingCurrent$ = this.accommodationService.getSeasonPricing(id);

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

  calculateTotal(pricePerNight: number | undefined, startDay: number | undefined, startMonth: number | undefined, endDay: number | undefined, endMonth: number | undefined): number {
    // If any required parameter is undefined, return 0
    if (pricePerNight === undefined || startDay === undefined || startMonth === undefined ||
      endDay === undefined || endMonth === undefined) {
      return 0;
    }
    const nights = this.calculateNumberOfNights(startDay, startMonth, endDay, endMonth);
    const total = nights * pricePerNight;
    return total * 1.19; // inkl. MwSt (19%)
  }

}
