import { Component, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {ImagesModel} from '../../interfaces/images-model';

@Component({
  selector: 'app-view.detals',
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './accommodation-details.html',
  standalone: true,
  styleUrl: './accommodation-details.scss'
})
export class AccommodationDetails {
  private route: ActivatedRoute = inject(ActivatedRoute);
  accommodationService: AccommodationService = inject(AccommodationService);
  accommodationDetails$: Observable<AccommodationModel | undefined>;
  accommodationImages$:Observable<ImagesModel[]>;

  constructor() {
    const id: number = this.route.snapshot.params['id'];
    this.accommodationDetails$ = this.accommodationService.getAccommodationById(id);
    this.accommodationImages$ = this.accommodationService.getAccommodationIdImage(id);
  }
}
