import {Component, inject, OnInit} from "@angular/core";
import { CommonModule } from '@angular/common';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {AccommodationService} from '../../services/accommodation-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Accommodation} from '../accommodation/accommodation';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-accommodation-list',
  imports: [
    CommonModule,
    Accommodation,
    ReactiveFormsModule,
  ],
  templateUrl: './accommodation-list.html',
  standalone: true,
  styleUrl: './accommodation-list.scss'
})
export class AccommodationList implements OnInit {
  filterForm!:FormGroup;

  private accommodationService = inject(AccommodationService);
  accommodations: AccommodationModel[] = [];
  filteredAccommodations: AccommodationModel[] = [];
  selectedSortText: string = 'Sortieren nach:';

  constructor(private fb: FormBuilder) {}

  /*function for dropdown*/
  isOpen = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }



  selectOption(option: string) {
    this.selectedSortText = option;
    this.isOpen = false;
  }


  ngOnInit() {

    this.filterForm = this.fb.group({
      filterBySize : [false],
      size: [20,[Validators.min(20)]],
      filterByRooms : [false],
      rooms: [1,[Validators.min(1)]],
      dogsAllowed: [false],
      hasWifi: [false],
      hasSauna: [false]
    });
    // Automatisches Anzeigen von Fehlern bei Werteingabe
    this.filterForm.get('size')?.valueChanges.subscribe(() => {
      this.filterForm.get('size')?.markAsTouched();
    });

    this.filterForm.get('rooms')?.valueChanges.subscribe(() => {
      this.filterForm.get('rooms')?.markAsTouched();
    });

    this.selectedSortText = 'Sortieren nach';
    this.accommodationService.getAllAccommodations().subscribe({
      next: (response) => {
        this.accommodations = response;
        this.filteredAccommodations = [...this.accommodations];

      },
      error: (error) => {
        console.error('Fehler beim Laden der Unterkünfte:', error);
      }
    });
  }
  resetFilters(): void {
    window.location.reload();

  }
  applyFilters(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    const form = this.filterForm.value;
    this.filteredAccommodations = this.accommodations.filter(acco=> {
      const totalRooms = (acco.numberOfMixedRooms ?? 0)+
                                  (acco.numberOfLivingRooms ?? 0)+
                                   (acco.numberOfBedrooms ?? 0);

      if (form.size != null && acco.squareMeter < form.size) {
        return false;
      }
      if (form.rooms != null && totalRooms< form.rooms) {
        return false;
      }
      if (form.dogsAllowed && !acco.isDogAllowed) {
        return false;
      }
      if (form.hasWifi && !acco.isWifiAvailable) {
        return false;
      }
      if (form.hasSauna && !acco.isSaunaAvailable) {
        return false;
      }
      return true;
    });
  }
  sortByCurrentPrice(ascending: boolean) {
    this.selectedSortText = `Preis ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a, b) => {
      const priceA = a.currentPrice ?? 0;
      const priceB = b.currentPrice ?? 0;
      return ascending ? priceA - priceB : priceB - priceA;
    });
  }

  sortBySquaremeter(ascending: boolean) {
    this.selectedSortText = `Wohnfläche ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a, b) =>
      ascending ? a.squareMeter - b.squareMeter : b.squareMeter - a.squareMeter
    );
  }

  private calculateTotalRooms(accommodation: AccommodationModel): number {
    return  (accommodation.numberOfLivingRooms ?? 0) +
            (accommodation.numberOfMixedRooms ?? 0) +
            (accommodation.numberOfBedrooms);
  }
  sortByNumbersOfRooms(ascending: boolean) {
    this.selectedSortText = `Anzahl der Räume ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a,b) =>
    ascending
    ? this.calculateTotalRooms(a) - this.calculateTotalRooms(b)
    : this.calculateTotalRooms(b) - this.calculateTotalRooms(a)
    );

  }
}
