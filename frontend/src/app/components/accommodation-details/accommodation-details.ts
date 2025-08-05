import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ImageModel} from '../../interfaces/image-model';
import {
  MatCalendar,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel, MatDatepickerModule,
  MatDateRangePicker
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/input';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-view.details',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DecimalPipe,
    MatCalendar,
    MatDateRangePicker,
    MatDatepickerActions,
    MatButton,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatSuffix,
    MatLabel,
    FormsModule
  ],
  providers:[
    MatDatepickerModule,
  ],
  templateUrl: './accommodation-details.html',
  standalone: true,
  styleUrl: './accommodation-details.scss'
})
export class AccommodationDetails {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  accommodationService: AccommodationService = inject(AccommodationService);
  accommodationDetails$: Observable<AccommodationModel | undefined>;
  accommodationImages$:Observable<ImageModel[]>;
  placeholderImage = 'placeholder.jpg';

  constructor() {
    const id: number = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(id);
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(id);
  }

  startDate?:Date;
  endDate?:Date;

  dateRangeAusgeben(){
    console.log("Startdatum", this.startDate);
    console.log("Enddatum", this.endDate);
  }
}
