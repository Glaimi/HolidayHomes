import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';

const now = new Date();

@Component({
  selector: 'app-calendar',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './calendar.html',
  standalone: true,
  styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {
  startDate?: Date;
  endDate?: Date;

  min = '2025-08-06T00:00';
  labels: any = [];
  invalid: any = [];
  colors: any = [];
  monthColors = [
    {
      background: '#b2f1c080',
      start: '2025-01-01T00:00',
      end: '2025-01-31T00:00',
      cellCssClass: 'md-book-rental-bg-off',
      recurring: {
        repeat: 'yearly',
        month: 1,
        day: 1,
      },
    },
    {
      background: '#b2f1c080',
      start: '2025-02-01T00:00',
      end: '2025-02-28T00:00',
      cellCssClass: 'md-book-rental-bg-off',
      recurring: {
        repeat: 'yearly',
        month: 2,
        day: 1,
      },
    },
    {
      background: '#b2f1c080',
      cellCssClass: 'md-book-rental-bg-off',
      recurring: {
        repeat: 'yearly',
        month: 2,
        day: 29,
      },
    },
    {
      background: '#a3cdff80',
      start: '2025-03-01T00:00',
      end: '2025-03-31T23:59',
      cellCssClass: 'md-book-rental-bg-pre',
      recurring: {
        repeat: 'yearly',
        month: 3,
        day: 1,
      },
    },
    {
      background: '#a3cdff80',
      start: '2025-04-01T00:00',
      end: '2025-04-30T00:00',
      cellCssClass: 'md-book-rental-bg-pre',
      recurring: {
        repeat: 'yearly',
        month: 4,
        day: 1,
      },
    },
    {
      background: '#a3cdff80',
      start: '2025-05-01T00:00',
      end: '2025-05-31T00:00',
      cellCssClass: 'md-book-rental-bg-pre',
      recurring: {
        repeat: 'yearly',
        month: 5,
        day: 1,
      },
    },
    {
      background: '#f7f7bb80',
      start: '2025-06-01T00:00',
      end: '2025-06-30T00:00',
      cellCssClass: 'md-book-rental-bg-in',
      recurring: {
        repeat: 'yearly',
        month: 6,
        day: 1,
      },
    },
    {
      background: '#f7f7bb80',
      start: '2025-07-01T00:00',
      end: '2025-07-31T00:00',
      cellCssClass: 'md-book-rental-bg-in',
      recurring: {
        repeat: 'yearly',
        month: 7,
        day: 1,
      },
    },
    {
      background: '#f7f7bb80',
      start: '2025-08-01T00:00',
      end: '2025-08-31T00:00',
      cellCssClass: 'md-book-rental-bg-in',
      recurring: {
        repeat: 'yearly',
        month: 8,
        day: 1,
      },
    },
    {
      background: '#f7f7bb80',
      start: '2025-09-01T00:00',
      end: '2025-09-30T00:00',
      cellCssClass: 'md-book-rental-bg-in',
      recurring: {
        repeat: 'yearly',
        month: 9,
        day: 1,
      },
    },
    {
      background: '#f7f7bb80',
      start: '2025-10-01T00:00',
      end: '2025-10-31T23:59',
      cellCssClass: 'md-book-rental-bg-in',
      recurring: {
        repeat: 'yearly',
        month: 10,
        day: 1,
      },
    },
    {
      background: '#b2f1c080',
      start: '2025-11-01T00:00',
      end: '2025-11-30T00:00',
      cellCssClass: 'md-book-rental-bg-off',
      recurring: {
        repeat: 'yearly',
        month: 11,
        day: 1,
      },
    },
    {
      background: '#b2f1c080',
      start: '2025-12-01T00:00',
      end: '2025-12-31T00:00',
      cellCssClass: 'md-book-rental-bg-off',
      recurring: {
        repeat: 'yearly',
        month: 12,
        day: 1,
      },
    },
  ];

  displayedYear: number = now.getFullYear();
  displayedMonth: number = now.getMonth();

  // Für Angular Material Datepicker
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate());

  // Für den Date Range Picker
  dateRange: DateRange<Date> = new DateRange<Date>(null, null);

  constructor(private http: HttpClient) {}

  getColors(start: Date, end: Date) {
    return [
      {
        date: start,
        cellCssClass: 'vacation-check-in',
      },
      {
        date: end,
        cellCssClass: 'vacation-check-out',
      },
      {
        start: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1),
        end: new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1),
        background: '#ffbaba80',
        cellCssClass: 'vacation-booked',
      },
    ];
  }

  ngOnInit(): void {
    this.loadMonth(this.displayedYear, this.displayedMonth);
  }

  loadMonth(year: number, month: number) {
    this.http.jsonp('https://trial.mobiscroll.com/getrentals/?year=' + year + '&month=' + month, 'callback').subscribe((data: any) => {
      const prices = data.prices;
      const bookings = data.bookings;
      const labels: any = [];
      const invalids: any = [];
      let colors: any = [];
      let endDate = new Date(year, month, 1, 0, 0);

      for (const price of prices) {
        const booked = bookings.find((b: { checkIn: any }) => {
          const checkInDate = new Date(b.checkIn);
          // YYYY-M-D Format erzeugen
          const jsFormatted = `${checkInDate.getFullYear()}-${checkInDate.getMonth() + 1}-${checkInDate.getDate()}`;
          return jsFormatted === price.date;
        });
        if (booked) {
          const checkIn = new Date(booked.checkIn);
          const checkOut = new Date(booked.checkOut);
          const newCheckOut = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate() - 1);
          colors = [...colors, ...this.getColors(checkIn, checkOut)];
          labels.push({
            start: checkIn,
            end: newCheckOut,
            text: 'booked',
            textColor: '#1e1e1ecc',
          });
          invalids.push({
            start: checkIn,
            end: newCheckOut,
          });
          endDate = checkOut;
        } else if (new Date(price.date) >= endDate) {
          labels.push({
            date: new Date(price.date),
            text: price.text,
            textColor: price.textColor,
          });
        }
      }
      this.labels = labels;
      this.invalid = invalids;
      this.colors = [...colors, ...this.monthColors];
    });
  }

  prevMonth() {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else {
      this.displayedMonth--;
    }
    this.loadMonth(this.displayedYear, this.displayedMonth);
  }

  nextMonth() {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    } else {
      this.displayedMonth++;
    }
    this.loadMonth(this.displayedYear, this.displayedMonth);
  }

  dateRangeAusgeben() {
    console.log('Startdatum:', this.dateRange.start);
    console.log('Enddatum:', this.dateRange.end);
  }
}
