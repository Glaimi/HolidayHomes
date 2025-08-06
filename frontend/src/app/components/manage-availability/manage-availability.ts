import {Component, inject} from '@angular/core';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BookingModel} from '../../interfaces/booking-model';
import {BookingService} from '../../services/booking-service';
import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'app-manage-availability',
  imports: [
    CommonModule,
    FormsModule,
    Calendar,
  ],
  templateUrl: './manage-availability.html',
  standalone: true,
  styleUrls: ['./manage-availability.scss']
})
export class ManageAvailability {
  private bookingService = inject(BookingService)

  accommodations: AccommodationModel[] = []
  bookings: BookingModel[] = [];
  searchValue: string = '';
  hasSearched: boolean = false;
  selectedAccommodation: AccommodationModel | null = null;

  private handleSearchResponse(response: AccommodationModel[] | AccommodationModel | null | undefined): void {
    this.hasSearched = true;
    console.log('API response:', response);
    if (Array.isArray(response)) {
      this.accommodations = response;
    } else if (response) {
      this.accommodations = [response];
    } else {
      this.accommodations = [];
    }
    if (this.accommodations.length > 0) {
      const accId = this.accommodations[0].id;
      this.selectedAccommodation = this.accommodations[0];
      this.bookingService.getBookingsByAccommodationId(accId).subscribe({
        next: (bookings: BookingModel[]) => {
          this.bookings = bookings;
        },
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Fehler beim Laden der Buchungen:', err);
          this.bookings = [];
        }
      });
    } else {
      this.selectedAccommodation = null;
      this.bookings = [];
    }
  }

  search() {
    this.hasSearched = false;
    if (!this.searchValue.trim()) {
      console.warn('Bitte eine ID oder einen Namen eingeben.');
      return;
    }

    const isNumeric = !isNaN(Number(this.searchValue));

    if (isNumeric) {
      this.bookingService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Fehler bei der Unterkunftssuche:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    } else {
      this.bookingService.searchAccommodation(undefined, this.searchValue).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Fehler bei der Unterkunftssuche:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    }
  }
}
