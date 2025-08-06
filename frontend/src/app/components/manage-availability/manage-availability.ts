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

  @ViewChild('calendarRef') calendarComponent!: any;

  accommodations: AccommodationModel[] = []
  bookings: BookingModel[] = [];
  searchValue: string = '';
  hasSearched: boolean = false;
  selectedAccommodation: AccommodationModel | null = null;
  selectedBooking: BookingModel | null = null;


  // Handle the response from the search API
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
          this.resetBookingSelection(); // Reset booking selection after accommodation change
        },
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Error loading bookings:', err);
          this.bookings = [];
          this.resetBookingSelection();
        }
      });
    } else {
      this.selectedAccommodation = null;
      this.bookings = [];
      this.resetBookingSelection();
    }
  }

  // Perform a search
  search() {
    this.hasSearched = false;
    if (!this.searchValue.trim()) {
      console.warn('Please enter an ID or a name.');
      return;
    }

    const isNumeric = !isNaN(Number(this.searchValue));

    if (isNumeric) {
      this.bookingService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Error searching for accommodation:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    } else {
      this.bookingService.searchAccommodation(undefined, this.searchValue).subscribe({
        next: (response: AccommodationModel[] | AccommodationModel | null | undefined) => this.handleSearchResponse(response),
        error: (err: any) => {
          this.hasSearched = true;
          console.error('Error searching for accommodation:', err);
          this.accommodations = [];
          this.bookings = [];
        }
      });
    }
  }

  // Add a new booking
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
        // Load bookings again
        this.bookingService.getBookingsByAccommodationId(this.selectedAccommodation!.id).subscribe(b => this.bookings = b);
        // Reset calendar selection
        this.calendarComponent.resetSelection();
        // Reload calendar bookings (to show new booking immediately)
        this.calendarComponent.loadBookings();
      },
      error: (err) => {
        alert('Fehler beim Speichern der Belegung!');
        console.error(err);
      }
    });
  }


  // Select a booking
  selectBooking(booking: BookingModel) {
    // Toggle selection: deselect if already selected
    if (this.selectedBooking && this.selectedBooking.id === booking.id) {
      this.selectedBooking = null;
    } else {
      this.selectedBooking = booking;
    }
    setTimeout(() => {
      if (this.calendarComponent && this.calendarComponent.refreshCalendar) {
        this.calendarComponent.refreshCalendar();
      }
    });
  }

  // Reset booking selection
  private resetBookingSelection() {
    this.selectedBooking = null;
    setTimeout(() => {
      if (this.calendarComponent && this.calendarComponent.refreshCalendar) {
        this.calendarComponent.refreshCalendar();
      }
    });
  }

  // Delete an existing booking
  loeschen() {
    if (!this.selectedAccommodation || !this.selectedBooking) return;
    this.bookingService.deleteBooking(this.selectedBooking.id).subscribe({
      next: () => {
        this.bookingService.getBookingsByAccommodationId(this.selectedAccommodation!.id)
          .subscribe(b => this.bookings = b);
        if (this.calendarComponent) {
          this.calendarComponent.loadBookings();
        }
        this.selectedBooking = null;
      },
      error: err => {
        console.error('Error deleting booking:', err);
      }
    });
  }
}
