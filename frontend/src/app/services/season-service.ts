import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SeasonModel} from '../interfaces/season-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:5152/api/Season';

  getAllSeasons(): Observable<SeasonModel[]> {
    return this.http.get<SeasonModel[]>(this.baseUrl);
  }
}
