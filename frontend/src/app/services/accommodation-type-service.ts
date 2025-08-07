import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccommodationTypeModel} from '../interfaces/accommodation-type-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationTypeService {
  private http: HttpClient = inject(HttpClient);

  getAllAccommodationTypes(): Observable<AccommodationTypeModel[]> {
    return this.http.get<AccommodationTypeModel[]>("http://localhost:5152/api/AccommodationType");
  }
}
