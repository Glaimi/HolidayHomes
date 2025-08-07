import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {BookingService} from '../../services/booking-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, DatePipe, DecimalPipe, CurrencyPipe} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import { Calendar } from '../calendar/calendar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeasonPricingModel } from '../../interfaces/season-pricing-model';

// This component is responsible for displaying accommodation details.

@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    Calendar,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
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

  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  seasonPricings: SeasonPricingModel[] = [];
  datePriceList: { date: Date, price: number, season: string }[] = [];
  totalPrice: number = 0;

  constructor() {
    // Get the accommodation ID from route parameters.
    this.accommodationId = this.route.snapshot.params['id'];
    // Fetch accommodation details using the AccommodationService.
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(this.accommodationId);
    // Fetch accommodation images using the AccommodationService.
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(this.accommodationId);
    this.accommodationDetails$.subscribe(accommodation => {
      this.seasonPricings = accommodation?.seasonPricings ?? [];
    });
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  calculateDatePrices() {
    this.datePriceList = [];
    this.totalPrice = 0;
    if (!this.selectedStartDate || !this.selectedEndDate) return;

    let current = new Date(this.selectedStartDate);
    current.setHours(0, 0, 0, 0);
    const end = new Date(this.selectedEndDate);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
      const year = current.getFullYear();
      const found = this.seasonPricings.find((s) => {
        const seasonStart = new Date(year, s.startMonth - 1, s.startDay);
        const seasonEnd = new Date(year, s.endMonth - 1, s.endDay);
        if (seasonEnd < seasonStart) {
          // Saison geht über Jahreswechsel
          return current >= seasonStart || current <= seasonEnd;
        } else {
          return current >= seasonStart && current <= seasonEnd;
        }
      });
      const price = found ? found.price : 0;
      this.datePriceList.push({
        date: new Date(current),
        price,
        season: found ? found.seasonTitle : 'Unbekannt'
      });
      this.totalPrice += price;
      current.setDate(current.getDate() + 1);
    }
  }

  onDateRangeSelected(start: Date, end: Date) {
    this.selectedStartDate = start;
    this.selectedEndDate = end;
    this.calculateDatePrices();
  }
}
