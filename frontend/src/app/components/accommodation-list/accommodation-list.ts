import {Component, inject, OnInit} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AccommodationModel, SeasonPricing} from '../../interfaces/accommodation-model';
import {AccommodationService} from '../../services/accommodation-service';
import {Accommodation} from '../accommodation/accommodation';


@Component({
  selector: 'app-accommodation-list',
  imports: [
    CommonModule,
    Accommodation,
    FormsModule
  ],
  templateUrl: './accommodation-list.html',
  standalone: true,
  styleUrl: './accommodation-list.scss'
})
export class AccommodationList implements OnInit {

  private accommodationService = inject(AccommodationService);
  accommodations: AccommodationModel[] = [];

  ngOnInit() {
    this.accommodationService.getAllAccommodations().subscribe({
      next: (response) => {
        console.log('Komplette Serverantwort:', JSON.stringify(response, null, 2));
        console.log('Typ der Antwort:', typeof response);
        console.log('Ist es ein Array?', Array.isArray(response));
        console.log('Erstes Element:', response[0]);
        this.accommodations = response;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Unterkünfte:', error);
      }
    });
  }
}
