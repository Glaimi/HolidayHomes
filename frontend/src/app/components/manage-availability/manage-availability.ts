import {Component, inject} from '@angular/core';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

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

  trackById(index: number, item: AccommodationModel): number {
    return item.id;
  }

  accommodations: AccommodationModel[] = []
  bookings: any[] = [];
  searchValue: string = '';

  search() {
    if (!this.searchValue.trim()) {
      console.warn('Bitte eine ID oder einen Namen eingeben.');
      return;
    }

    const isNumeric = !isNaN(Number(this.searchValue));

    if (isNumeric) {
      this.accommodationService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
        next: (response) => {
          this.accommodations = Array.isArray(response) ? response : (response ? [response] : []);
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
        },
        error: (err) => {
          console.error('Fehler beim Laden per ID:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    } else {
      this.accommodationService.searchAccommodation(undefined, this.searchValue).subscribe({
        next: (response) => {
          this.accommodations = response ? [response] : [];
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
        },
        error: (err) => {
          console.error('Fehler beim Laden per Name:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    }
  }
}
