import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getAccommodationIdImage(id: number | undefined): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(`http://localhost:5152/api/accommodations/${id}/images`);
  }

  getAccommodationById(id: number | undefined): Observable<AccommodationModel | undefined> {
    return this.getAllAccommodations().pipe(
      map((accommodations) => accommodations.find(a => a.id == id))
    );
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
