import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KitchenTypeModel} from '../interfaces/kitchen-type-model';

@Injectable({
  providedIn: 'root'
})
export class KitchenTypeService {
  private http: HttpClient = inject(HttpClient);

  getAllKitchenTypes(): Observable<KitchenTypeModel[]> {
    return this.http.get<KitchenTypeModel[]>("http://localhost:5152/api/KitchenType");
  }
}
