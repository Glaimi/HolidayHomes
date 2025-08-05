import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccommodationModel} from '../interfaces/accommodation-model';
import { map } from 'rxjs/operators';
import {ImageModel} from '../interfaces/image-model';

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

  searchAccommodation(id?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (id !== undefined && id !== null) {
      params = params.set('id', id.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>('http://localhost:5152/api/Accommodation/search', { params });
  }
}
