import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  http : HttpClient = inject(HttpClient);

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

  getAllBookings(accommodationId){
    return
  }
}
