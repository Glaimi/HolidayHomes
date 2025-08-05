import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccommodationModel} from '../interfaces/accommodation-model';
import { map } from 'rxjs/operators';
import {ImageModel} from '../interfaces/image-model';
import { BookingModel } from '../interfaces/booking-model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private readonly http: HttpClient = inject(HttpClient);

  getAllAccommodations(): Observable<AccommodationModel[]> {
    return this.http.get<AccommodationModel[]>('http://localhost:5152/api/Accommodation');
  }

  getAccommodationIdImage(id: number | undefined): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }

  getAccommodationById(id: number | undefined): Observable<AccommodationModel | undefined> {
    return this.getAllAccommodations().pipe(
      map((accommodations) => accommodations.find(a => a.id == id))
    );
  }

  searchAccommodation(id?: number, name?: string): Observable<AccommodationModel[]> {
    let params = new HttpParams();
    if (id !== undefined && id !== null) {
      params = params.set('id', id.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<AccommodationModel[]>('http://localhost:5152/api/Accommodation/search', {params});
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

    console.log(body)

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url,body, options);
  }
}
