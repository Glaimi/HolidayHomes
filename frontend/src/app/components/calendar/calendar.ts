import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCalendar } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingService } from '../../services/booking-service';
import { BookingModel } from '../../interfaces/booking-model';

const now = new Date();

@Component({
  selector: 'app-calendar',
  imports: [
    MatCalendar,
    MatNativeDateModule,
    FormsModule,
    DatePipe,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './calendar.html',
  standalone: true,
  styleUrl: './calendar.scss',
  encapsulation: ViewEncapsulation.None
})
export class Calendar implements OnInit, OnChanges {
  displayedYear: number = now.getFullYear();
  displayedMonth: number = now.getMonth();

  // Bereichsauswahl-Properties für eigenen Kalender
  startDateSelected: Date | null = null;
  endDateSelected: Date | null = null;

  // Für den auswählbaren Kalender
  minDate: Date = new Date();

  @Input() accommodationId?: number;
  bookings: BookingModel[] = [];
  bookedDates: Date[] = [];

  // Fehler-Property für das Template
  public selectionError: string | null = null;

  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;

  constructor(private http: HttpClient, private bookingService: BookingService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accommodationId'] && this.accommodationId) {
      this.loadBookings();
    }
  }

  private loadBookings() {
    this.startDateSelected = null;
    this.endDateSelected = null;
    if (this.accommodationId) {
      this.bookingService.getBookingsByAccommodationId(this.accommodationId).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.bookedDates = bookings.flatMap(b => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            const days = [];
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              days.push(new Date(d));
            }
            return days;
          });
          this.cdr.detectChanges();
          if (this.calendar) {
            this.calendar.updateTodaysDate(); // Kalender-Refresh erzwingen
          }
        },
        error: (err) => {
          console.error('Fehler beim Laden der Buchungen:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  onDateSelected(date: Date | null) {
    this.selectionError = null;
    if (!date) return;

    // Immer neue Auswahl starten, wenn Enddatum gesetzt ist (auch nach Reload)
    if (!this.startDateSelected || this.endDateSelected) {
      this.startDateSelected = date;
      this.endDateSelected = null;
    } else {
      // Bereich bestimmen (egal ob vorwärts oder rückwärts gewählt)
      const start = this.startDateSelected < date ? this.startDateSelected : date;
      const end = this.startDateSelected > date ? this.startDateSelected : date;

      // Prüfe, ob Bereich frei ist
      let conflict = false;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (this.bookedDates.some(b =>
          b.getFullYear() === d.getFullYear() &&
          b.getMonth() === d.getMonth() &&
          b.getDate() === d.getDate()
        )) {
          conflict = true;
          break;
        }
      }

      if (conflict) {
        this.selectionError = 'Der gewählte Zeitraum enthält bereits gebuchte Tage!';
        return;
      }

      this.startDateSelected = start;
      this.endDateSelected = end;
    }
    // Keine Persistenz mehr
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
    this.cdr.detectChanges();
  }

  resetSelection() {
    this.startDateSelected = null;
    this.endDateSelected = null;
    // Keine Auswahl aus LocalStorage entfernen
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
    this.cdr.detectChanges();
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    // Keine Vergangenheit und keine gebuchten Tage auswählbar
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) return false;
    return !this.bookedDates.some(b =>
      b.getFullYear() === date.getFullYear() &&
      b.getMonth() === date.getMonth() &&
      b.getDate() === date.getDate()
    );
  };

  public dateClassCombined = (date: Date): string => {
    const normalize = (d: Date | null) => d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;
    const current = normalize(date);

    // Gebuchte Tage: rot
    const isBooked = this.bookedDates.some(
      d => d.getFullYear() === date.getFullYear() &&
           d.getMonth() === date.getMonth() &&
           d.getDate() === date.getDate()
    );
    if (isBooked) return 'booked-date';

    // Auswahlbereich: nutze Angular Material Range-Klassen
    const start = normalize(this.startDateSelected);
    const end = normalize(this.endDateSelected);
    if (start && end && current) {
      if (current.getTime() === start.getTime()) return 'mat-calendar-body-range-start';
      if (current.getTime() === end.getTime()) return 'mat-calendar-body-range-end';
      if (current > start && current < end) return 'mat-calendar-body-in-range';
    }
    return '';
  };
}
