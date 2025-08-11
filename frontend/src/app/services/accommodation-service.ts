import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccommodationModel, SeasonPricingCalculate} from '../interfaces/accommodation-model';
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
  getAccommodationIdImage(id: number | undefined): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }
  getAccommodationById(id: number | undefined): Observable<AccommodationModel | undefined> {
    return this.getAllAccommodations().pipe(
      map((accommodations) => accommodations.find(a => a.id == id))
    );
  }

  getCalculatedPrice(id: number, formattedStart: string, formattedEnd: string) {
    return this.http.get<number>(
      `http://localhost:5152/api/SeasonPricing/${id}/calculated?startDate=${formattedStart}&endDate=${formattedEnd}`
    );
  }


}



