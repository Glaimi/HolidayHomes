import {Component, inject, ViewChild} from '@angular/core';
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

  @ViewChild('calendarRef') calendarComponent!: Calendar;

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

  // Fügt eine neue Belegung hinzu
  belegen() {
    if (!this.selectedAccommodation) {
      alert('Bitte zuerst eine Unterkunft suchen und auswählen.');
      return;
    }
    if (!this.calendarComponent?.startDateSelected || !this.calendarComponent?.endDateSelected) {
      alert('Bitte im Kalender einen Zeitraum auswählen.');
      return;
    }
    const start = this.calendarComponent.startDateSelected;
    const end = this.calendarComponent.endDateSelected;
    this.bookingService.bookAccommodation(this.selectedAccommodation.id, start, end).subscribe({
      next: () => {
        alert('Belegung erfolgreich gespeichert.');
        // Buchungen neu laden
        this.bookingService.getBookingsByAccommodationId(this.selectedAccommodation!.id).subscribe(b => this.bookings = b);
        // Kalender-Auswahl zurücksetzen
        this.calendarComponent.resetSelection();
        // Kalender-Buchungen neu laden (damit neue Belegung sofort sichtbar)
        this.calendarComponent.loadBookings();
      },
      error: (err) => {
        alert('Fehler beim Speichern der Belegung!');
        console.error(err);
      }
    });
  }

  // Löscht eine bestehende Belegung
  loeschen() {
    console.log('Löschen aufgerufen');
  }
}
