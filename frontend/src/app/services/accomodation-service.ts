import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationModel } from '../interfaces/accomodation-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private http: HttpClient = inject(HttpClient);

  getAllAccomodations(): Observable<AccommodationModel[]> {
    return this.http.get<AccommodationModel[]>('http://localhost:5152/api/Accommodation');
  }

  getAccomodationIdImage(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }

  getAccommodationById(id: number): Observable<AccommodationModel> {
    return this.http.get<AccommodationModel>(`http://localhost:5152/api/Accommodation/${id}`).pipe(
      map(accommodation => {
        // Transform the response if needed
        return accommodation;
      })
    );
  }
}
