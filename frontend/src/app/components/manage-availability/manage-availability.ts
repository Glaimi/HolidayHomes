import {Component, inject} from '@angular/core';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {CommonModule} from '@angular/common';
import {Accommodation} from '../accommodation/accommodation';

@Component({
  selector: 'app-manage-availability',
  imports: [ CommonModule,
    Accommodation,
    ],
  templateUrl: './manage-availability.html',
  standalone: true,
  styleUrl: './manage-availability.scss'
})
export class ManageAvailability {
  private accommodationService = inject(AccommodationService)

  accommodations: AccommodationModel[] = []
  searchValue: string = '';

  search() {
    if (!this.searchValue.trim()) {
      console.warn('Bitte eine ID oder einen Namen eingeben.');
      return;
    }

    const isNumeric = !isNaN(Number(this.searchValue));

    if (isNumeric) {
      // Suche per ID
      this.accommodationService.getAccommodationById(Number(this.searchValue)).subscribe({
        next: (response) => {
          this.accommodations = response ? [response] : [];
        },
        error: (err) => {
          console.error('Fehler beim Laden per ID:', err);
          this.accommodations = [];
        }
      });
    } else {
      // Suche per Name
      this.accommodationService.getAccommodationByName(this.searchValue).subscribe({
        next: (response) => {
          this.accommodations = response ? [response] : [];
        },
        error: (err) => {
          console.error('Fehler beim Laden per Name:', err);
          this.accommodations = [];
        }
      });
    }
  }
}
