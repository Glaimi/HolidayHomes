import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-view.detals',
  imports: [
    AsyncPipe
  ],
  templateUrl: './view.details.html',
  standalone: true,
  styleUrl: './view.details.scss'
})
export class ViewDetails {
  private route: ActivatedRoute = inject(ActivatedRoute);
  accommodationService: AccommodationService = inject(AccommodationService);
  accommodationDetails$: Observable<AccommodationModel | undefined>;

  constructor() {
    const id: number = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(id);
  }
}
