import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccomodationModel} from '../interfaces/accomodation-model';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  private http: HttpClient = inject(HttpClient);

  getAllAccomodations(): Observable<AccomodationModel[]> {
    return this.http.get<AccomodationModel[]>('http://localhost:5152/api/Accommodation');
  }

  getAccomodationIdImage(id: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }
}
