import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import { MatCalendar } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DecimalPipe,
    DatePipe,
    MatCalendar,
    MatNativeDateModule,
    FormsModule
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
  accommodationId:number;
  bookingService: BookingService = inject(BookingService);

  constructor(private router: Router) {
    this.accommodationId = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(this.accommodationId);
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(this.accommodationId);
  }

  selectedDate: Date | null = null;
  startDateSelected: Date | null = null;
  endDateSelected: Date | null = null;

  onDateSelected(date: Date | null) {
    if (!date) return;

    if (!this.startDateSelected) {
      // Erstes Datum wird als Startdatum gesetzt
      this.startDateSelected = date;
    } else if (!this.endDateSelected) {
      // Zweites Datum wird als Enddatum gesetzt
      if (date >= this.startDateSelected) {
        this.endDateSelected = date;
      } else {
        // Falls das zweite Datum früher ist, tausche sie
        this.endDateSelected = this.startDateSelected;
        this.startDateSelected = date;
      }
    } else {
      // Wenn beide Daten bereits gesetzt sind, beginne von vorne
      this.startDateSelected = date;
      this.endDateSelected = null;
    }
  }

  resetSelection() {
    this.startDateSelected = null;
    this.endDateSelected = null;
    this.selectedDate = null;
  }

  dateRangeAusgeben(){
    console.log("Startdatum", this.startDateSelected);
    console.log("Enddatum", this.endDateSelected);
    console.log("ID", this.accommodationId);

    this.bookingService.bookAccommodation(this.accommodationId, this.startDate, this.endDate).subscribe(() => {
      console.log("Abgesendet")
    })
  }
}
