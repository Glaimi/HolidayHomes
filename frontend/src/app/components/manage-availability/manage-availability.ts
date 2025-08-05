import {Component, inject} from '@angular/core';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BookingModel} from '../../interfaces/booking-model';

@Component({
  selector: 'app-manage-availability',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './manage-availability.html',
  standalone: true,
  styleUrl: './manage-availability.scss'
})
export class ManageAvailability {
  private accommodationService = inject(AccommodationService)

  accommodations: AccommodationModel[] = []
  bookings: BookingModel[] = [];
  searchValue: string = '';

  private handleSearchResponse(response: AccommodationModel[] | AccommodationModel | null | undefined): void {
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
      this.accommodationService.getBookingsByAccommodationId(accId).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
        },
        error: (err) => {
          console.error('Fehler beim Laden der Buchungen:', err);
          this.bookings = [];
        }
      });
    } else {
      this.bookings = [];
    }
  }

  search() {
    if (!this.searchValue.trim()) {
      console.warn('Bitte eine ID oder einen Namen eingeben.');
      return;
    }

    const isNumeric = !isNaN(Number(this.searchValue));

    if (isNumeric) {
      this.accommodationService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err) => {
          console.error('Fehler bei der Unterkunftssuche:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    } else {
      this.accommodationService.searchAccommodation(undefined, this.searchValue).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err) => {
          console.error('Fehler bei der Unterkunftssuche:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    }
  }
}
