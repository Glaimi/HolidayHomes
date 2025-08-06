import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationModel } from '../interfaces/accommodation-model';
import { BookingModel } from '../interfaces/booking-model';

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http: HttpClient = inject(HttpClient);

  // Search for accommodations by ID or name
  searchAccommodation(id?: number, name?: string): Observable<AccommodationModel[]> {
    let params = new HttpParams();
    if (id !== undefined && id !== null) {
      params = params.set('id', id.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<AccommodationModel[]>('http://localhost:5152/api/Accommodation/search', { params });
  }

  // Get bookings by accommodation ID
  getBookingsByAccommodationId(accommodationId: number): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`http://localhost:5152/api/Booking?accommodationId=${accommodationId}`);
  }

  // Book an accommodation
  bookAccommodation(accommodationId:number,startDate:Date,endDate:Date){
    const url = `http://localhost:5152/api/Booking`;
    const body = {
      AccommodationId: accommodationId,
      StartDate: toLocalDateString(startDate),
      EndDate: toLocalDateString(endDate)
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url,body, options);
  }

  // Delete a booking
  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete(`http://localhost:5152/api/Booking/${bookingId}`);
  }
}
