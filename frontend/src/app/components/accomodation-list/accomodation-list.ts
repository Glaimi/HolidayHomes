import {Component, inject, OnInit} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AccommodationModel, SeasonPricing} from '../../interfaces/accomodation-model';
import {AccommodationService} from '../../services/accomodation-service';
import {Accomodation} from '../../accomodation/accomodation';

type SortOption = {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
};

type FilterOptions = {
  minSize: number | null;
  minRooms: number | null;
  dogsAllowed: boolean;
  hasWifi: boolean;
  hasSauna: boolean;
};

@Component({
  selector: 'app-accomodation-list',
  imports: [
    CommonModule,
    Accomodation,
    FormsModule
  ],
  templateUrl: './accomodation-list.html',
  standalone: true,
  styleUrl: './accomodation-list.scss'
})
export class AccomodationList implements OnInit {
  private accomodationService = inject(AccommodationService);
  allAccommodations: AccommodationModel[] = [];
  filteredAccommodations: AccommodationModel[] = [];

  // Sorting options
  sortOptions: SortOption[] = [
    { value: 'price-asc', label: 'Preis: Aufsteigend', direction: 'asc' },
    { value: 'price-desc', label: 'Preis: Absteigend', direction: 'desc' },
    { value: 'size-asc', label: 'Wohnfläche: Aufsteigend', direction: 'asc' },
    { value: 'size-desc', label: 'Wohnfläche: Absteigend', direction: 'desc' },
    { value: 'rooms-asc', label: 'Zimmer: Aufsteigend', direction: 'asc' },
    { value: 'rooms-desc', label: 'Zimmer: Absteigend', direction: 'desc' }
  ];
  selectedSort: string = 'price-asc';

  // Filter options
  filterOptions: FilterOptions = {
    minSize: null,
    minRooms: null,
    dogsAllowed: false,
    hasWifi: false,
    hasSauna: false
  };

  // Available size options for filter
  sizeOptions = [
    { value: 50, label: 'ab 50 m²' },
    { value: 75, label: 'ab 75 m²' },
    { value: 100, label: 'ab 100 m²' },
    { value: 150, label: 'ab 150 m²' }
  ];

  // Available room options for filter
  roomOptions = [
    { value: 1, label: '1+ Zimmer' },
    { value: 2, label: '2+ Zimmer' },
    { value: 3, label: '3+ Zimmer' },
    { value: 4, label: '4+ Zimmer' }
  ];

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    this.accomodationService.getAllAccomodations().subscribe({
      next: (response: AccommodationModel[]) => {
        console.log('Komplette Serverantwort:', JSON.stringify(response, null, 2));
        this.allAccommodations = [...response];
        this.applyFilters();
      },
      error: (error) => {
        console.error('Fehler beim Laden der Unterkünfte:', error);
      }
    });
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterOptions = {
      minSize: null,
      minRooms: null,
      dogsAllowed: false,
      hasWifi: false,
      hasSauna: false
    };
    this.applyFilters();
  }

  private applyFilters(): void {
    // Apply all filters
    let filtered = [...this.allAccommodations];

    // Filter by size
    if (this.filterOptions.minSize !== null) {
      filtered = filtered.filter(acc => acc.squareMeter >= this.filterOptions.minSize!);
    }

    // Filter by number of rooms
    if (this.filterOptions.minRooms !== null) {
      filtered = filtered.filter(acc => acc.numberOfBedrooms >= this.filterOptions.minRooms!);
    }

    // Filter by dogs allowed
    if (this.filterOptions.dogsAllowed) {
      filtered = filtered.filter(acc => acc.isDogAllowed);
    }

    // Filter by WiFi
    if (this.filterOptions.hasWifi) {
      filtered = filtered.filter(acc => acc.isWifiAvailable);
    }

    // Filter by sauna
    if (this.filterOptions.hasSauna) {
      filtered = filtered.filter(acc => acc.isSaunaAvailable);
    }

    // Apply sorting
    this.filteredAccommodations = this.sortAccommodations(filtered, this.selectedSort);
  }

  private sortAccommodations(accommodations: AccommodationModel[], sortOption: string): AccommodationModel[] {
    if (!accommodations.length) return [];
    const [sortBy, order] = sortOption.split('-');
    const direction = order === 'asc' ? 1 : -1;

    return accommodations.sort((a, b) => {
      let valueA: number;
      let valueB: number;

      switch(sortBy) {
        case 'price':
          // Handle both string and array types for seasonPricing
          const getPrice = (pricing: string | SeasonPricing[]): number => {
            if (!pricing) return 0;
            if (Array.isArray(pricing) && pricing.length > 0) {
              // Use the first season pricing entry's price
              return pricing[0].price || 0;
            } else if (typeof pricing === 'string') {
              return parseFloat(pricing) || 0;
            }
            return 0;
          };

          const priceA = getPrice(a.seasonPricing);
          const priceB = getPrice(b.seasonPricing);
          return (priceA - priceB) * direction;

        case 'size':
          valueA = a.squareMeter || 0;
          valueB = b.squareMeter || 0;
          return (valueA - valueB) * direction;

        case 'rooms':
          // Using numberOfBedrooms for room count
          valueA = a.numberOfBedrooms || 0;
          valueB = b.numberOfBedrooms || 0;
          return (valueA - valueB) * direction;

        default:
          return 0;
      }
    });
  }
}
