import { Injectable, inject } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationModel } from '../interfaces/accommodation-model';
import { BookingModel } from '../interfaces/booking-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http: HttpClient = inject(HttpClient);

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

  getBookingsByAccommodationId(accommodationId: number): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`http://localhost:5152/api/Booking?accommodationId=${accommodationId}`);
  }

  bookAccommodation(accommodationId:number,startDate:Date,endDate:Date){
    const url = `http://localhost:5152/api/Booking`;
    const body = {
      AccommodationId: accommodationId,
      StartDate: startDate.toISOString().split('T', 1)[0],
      EndDate: endDate.toISOString().split('T',1)[0]
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url,body, options);
  }


}
