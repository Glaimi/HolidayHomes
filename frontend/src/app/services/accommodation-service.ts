import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccommodationModel} from '../interfaces/accommodation-model';
import { map } from 'rxjs/operators';
import {ImageModel} from '../interfaces/image-model';
import {AddAccommodationDto} from '../interfaces/add-accommodation-dto';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private readonly http: HttpClient = inject(HttpClient);

  saveAccommodation(accommodation: AddAccommodationDto): Observable<AccommodationModel> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<AccommodationModel>('http://localhost:5152/api/Accommodation', accommodation, options);
  }

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

  uploadAccommodationImage(id: number, formData: FormData) {
    return this.http.post(`http://localhost:5152/api/accommodations/${id}/images/upload`, formData);
  }
}
