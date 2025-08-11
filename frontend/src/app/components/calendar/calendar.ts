import {
  ChangeDetectorRef,
  Component, inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCalendar } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, DecimalPipe} from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingService } from '../../services/booking-service';
import { BookingModel } from '../../interfaces/booking-model';
import {AccommodationService} from '../../services/accommodation-service';

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
    MatInputModule,
    DecimalPipe
  ],
  templateUrl: './calendar.html',
  standalone: true,
  styleUrl: './calendar.scss',
  encapsulation: ViewEncapsulation.None
})
export class Calendar implements OnInit, OnChanges {
  displayedYear: number = now.getFullYear();
  displayedMonth: number = now.getMonth();

  // Selection properties for custom calendar
  startDateSelected: Date | null = null;
  endDateSelected: Date | null = null;

  // For the selectable calendar
  minDate: Date = new Date();

  @Input() accommodationId?: number;
  @Input() highlightBooking: BookingModel | null = null;
  bookings: BookingModel[] = [];
  bookedDates: Date[] = [];

  // Error property for the template
  public selectionError: string | null = null;
  public totalPrice: number | null = null;

  @ViewChild(MatCalendar) matCalendar!: MatCalendar<Date>;

  constructor(private http: HttpClient, private bookingService: BookingService, private cdr: ChangeDetectorRef, private accommodationService: AccommodationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accommodationId'] && this.accommodationId) {
      this.loadBookings();
    }
    if (changes['highlightBooking']) {
      this.cdr.detectChanges();
    }
  }

  public loadBookings() {
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
          this.refreshCalendar();
        },
        error: (err) => {
          console.error('Error loading bookings:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadBookings();
  }


  onDateSelected(date: Date | null) {
    this.selectionError = null;
    this.totalPrice = null;

    if (!date) return;

    // Always start a new selection if the end date is set (also after reload)
    if (!this.startDateSelected || this.endDateSelected) {
      this.startDateSelected = date;
      this.endDateSelected = null;
    } else {
      // Determine the range (regardless of whether it's selected forwards or backwards)
      const start = this.startDateSelected < date ? this.startDateSelected : date;
      const end = this.startDateSelected > date ? this.startDateSelected : date;

      // Check if the range is free
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

      // ich habe hier auskommentiert, weil diese kode funktionierte wie unten
      // this.accommodationService.getCalculatedPrice(this.accommodationId, this.startDateSelected, this.endDateSelected).subscribe(
      //   {
      //     next: (result: number) => {
      //       console.log(result)
      //       this.totalPrice = result;
      //     }
      //   }
      // );
    }
    this.refreshCalendar();
    this.cdr.detectChanges();
    // if (this.accommodationId && this.startDateSelected && this.endDateSelected) {
    //   this.accommodationService
    //     .getCalculatedPrice(this.accommodationId, this.startDateSelected, this.endDateSelected).subscribe({
    //       next: price => {
    //         this.totalPrice = price;
    //         console.log(price)
    //
    //         this.cdr.detectChanges();
    //       },
    //       error: err => {
    //         console.error('Preisberechnung fehlgeschlagen', err);
    //       }
    //     });
    // }
    if (this.accommodationId && this.startDateSelected && this.endDateSelected) {
      const formattedStart = this.startDateSelected.toLocaleDateString('sv-SE'); // yyyy-MM-dd
      const formattedEnd = this.endDateSelected.toLocaleDateString('sv-SE');

      this.accommodationService
        .getCalculatedPrice(this.accommodationId, formattedStart, formattedEnd)
        .subscribe({
          next: price => {
            this.totalPrice = price;
            this.cdr.detectChanges();
          },
          error: err => {
            console.error('Preisberechnung fehlgeschlagen', err);
          }
        });
    }
  }

  resetSelection() {
    this.startDateSelected = null;
    this.endDateSelected = null;
    this.refreshCalendar();
    this.cdr.detectChanges();
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    // No past dates and no booked dates are selectable
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    return !this.bookedDates.some(b =>
      b.getFullYear() === date.getFullYear() &&
      b.getMonth() === date.getMonth() &&
      b.getDate() === date.getDate()
    );
  };

  dateClassCombined = (date: Date): string => {
    if (this.highlightBooking) {
      // Convert strings to Date objects and set time to 0
      const start = new Date(this.highlightBooking.startDate);
      const end = new Date(this.highlightBooking.endDate);
      start.setHours(0,0,0,0);
      end.setHours(0,0,0,0);
      const current = new Date(date);
      current.setHours(0,0,0,0);
      if (current >= start && current <= end) {
        return 'highlighted-booking-date';
      }
    }
    // ... Rest remains the same
    const isBooked = this.bookedDates.some(
      d => d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
    if (isBooked) return 'booked-date';

    const normalize = (d: Date | null) => d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;
    const current = normalize(date);
    const start = normalize(this.startDateSelected);
    const end = normalize(this.endDateSelected);
    if (start && end && current) {
      if (current.getTime() === start.getTime()) return 'mat-calendar-body-range-start';
      if (current.getTime() === end.getTime()) return 'mat-calendar-body-range-end';
      if (current > start && current < end) return 'mat-calendar-body-in-range';
    }
    return '';
  };

  public refreshCalendar() {
    if (this.matCalendar) {
      this.matCalendar.updateTodaysDate();
    }
  }

  // Calculate the number of selected days
  calculateSelectedDaysInternal(): number {
    if (!this.startDateSelected || !this.endDateSelected) {
      return 0;
    }

    const start = new Date(this.startDateSelected);
    const end = new Date(this.endDateSelected);
    const diffInMs = end.getTime() - start.getTime();
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return days +1;
  }

}

