import {Component, inject} from '@angular/core';
import {AccommodationService} from '../../services/accommodation-service';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {CommonModule} from '@angular/common';
import {Accommodation} from '../accommodation/accommodation';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-manage-availability',
  imports: [
    CommonModule,
    Accommodation,
    FormsModule,
  ],
  templateUrl: './manage-availability.html',
  standalone: true,
  styleUrl: './manage-availability.scss'
})
export class ManageAvailability {
  private accommodationService = inject(AccommodationService)

  trackById(index: number, item: AccommodationModel): number {
    return item.id;
  }

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
      // this.accommodationService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
      //   next: (response) => {
      //     this.accommodations = response ? [response] : [];
      //   },
      //   error: (err) => {
      //     console.error('Fehler beim Laden per ID:', err);
      //     this.accommodations = [];
      //   }
      // });

      this.accommodationService.searchAccommodation(Number(this.searchValue), undefined).subscribe({
        next: (response) => {
          this.accommodations = Array.isArray(response) ? response : (response ? [response] : []);
        },
        error: (err) => {
          console.error('Fehler beim Laden per ID:', err);
          this.accommodations = [];
        }
      });

    } else {
      // Suche per Name
      this.accommodationService.searchAccommodation(undefined, this.searchValue).subscribe({
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
