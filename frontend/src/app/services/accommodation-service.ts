import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AccommodationModel} from '../interfaces/accommodation-model';
import { map } from 'rxjs/operators';
import {ImageModel} from '../interfaces/image-model';
import { BookingModel } from '../interfaces/booking-model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private readonly http: HttpClient = inject(HttpClient);

  getAllAccommodations(): Observable<AccommodationModel[]> {
    return this.http.get<AccommodationModel[]>('http://localhost:5152/api/Accommodation');
  }

  getAccommodationIdImage(id: number): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }

  getAccommodationById(id: number): Observable<AccommodationModel | undefined> {
    return this.getAllAccommodations().pipe(
      map((accommodations) => accommodations.find(a => a.id == id))
    );
  }

  searchAccommodation(id?: number, name?: string): Observable<AccommodationModel[]> {
    throw new Error('searchAccommodation has moved to BookingService. Please use BookingService.');
  }

  getBookingsByAccommodationId(accommodationId: number): Observable<BookingModel[]> {
    throw new Error('getBookingsByAccommodationId has moved to BookingService. Please use BookingService.');
  }
}
