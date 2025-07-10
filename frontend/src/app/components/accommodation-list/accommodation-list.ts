import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AccommodationModel } from '../../interfaces/accommodation-model';
import { AccommodationService } from '../../services/accommodation-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Accommodation } from '../accommodation/accommodation';

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
  /** Reactive form group used to hold filter input controls. */
  filterForm!: FormGroup;

  /** Dependency injection of the accommodation service to retrieve data from backend. */
  private accommodationService = inject(AccommodationService);

  /** All loaded accommodations from the backend. */
  accommodations: AccommodationModel[] = [];

  /** Accommodations after filters have been applied. */
  filteredAccommodations: AccommodationModel[] = [];

  /** Label displayed on the sort dropdown button. */
  selectedSortText: string = 'Sortieren nach:';

  /** Form builder instance used to construct the reactive form. */
  constructor(private fb: FormBuilder) {}

  /** Controls the visibility state of the sorting dropdown. */
  isOpen = false;

  /** Holds the currently selected dropdown option (not used currently). */
  selectedOption: string | null = null;

  /**
   * Toggles the visibility of the dropdown menu.
   */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Sets the selected sorting option and closes the dropdown menu.
   * @param option The selected sorting option label
   */
  selectOption(option: string): void {
    this.selectedSortText = option;
    this.isOpen = false;
  }

  /**
   * Lifecycle hook that initializes the form and loads the accommodations.
   */
  ngOnInit(): void {
    // Initialize the reactive filter form with default values and validators
    this.filterForm = this.fb.group({
      filterBySize: [false],
      size: [20, [Validators.min(20)]],
      filterByRooms: [false],
      rooms: [1, [Validators.min(1)]],
      dogsAllowed: [false],
      hasWifi: [false],
      hasSauna: [false]
    });

    // Mark 'size' field as touched whenever its value changes, to trigger validation messages
    this.filterForm.get('size')?.valueChanges.subscribe(() => {
      this.filterForm.get('size')?.markAsTouched();
    });

    // Same behavior for 'rooms' field
    this.filterForm.get('rooms')?.valueChanges.subscribe(() => {
      this.filterForm.get('rooms')?.markAsTouched();
    });

    // Set default label for the sorting dropdown
    this.selectedSortText = 'Sortieren nach';

    // Load all accommodations from the backend via service
    this.accommodationService.getAllAccommodations().subscribe({
      next: (response) => {
        this.accommodations = response;
        this.filteredAccommodations = [...this.accommodations];
      },
      error: (error) => {
        console.error('Error while loading accommodations:', error);
      }
    });
  }

  /**
   * Resets all filters by reloading the entire page.
   * (This could be refactored in future to preserve app state.)
   */
  resetFilters(): void {
    window.location.reload();
  }

  /**
   * Applies the selected filters to the list of accommodations.
   * Filters include size, number of rooms, and availability flags.
   */
  applyFilters(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }

    const form = this.filterForm.value;

    this.filteredAccommodations = this.accommodations.filter(acco => {
      const totalRooms =
        (acco.numberOfMixedRooms ?? 0) +
        (acco.numberOfLivingRooms ?? 0) +
        (acco.numberOfBedrooms ?? 0);

      if (form.size != null && acco.squareMeter < form.size) {
        return false;
      }
      if (form.rooms != null && totalRooms < form.rooms) {
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

  /**
   * Sorts the filtered accommodations by current price.
   * @param ascending Whether the sorting is ascending or descending
   */
  sortByCurrentPrice(ascending: boolean): void {
    this.selectedSortText = `Preis ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a, b) => {
      const priceA = a.currentPrice ?? 0;
      const priceB = b.currentPrice ?? 0;
      return ascending ? priceA - priceB : priceB - priceA;
    });
  }

  /**
   * Sorts the filtered accommodations by square meters (living area).
   * @param ascending Whether the sorting is ascending or descending
   */
  sortBySquaremeter(ascending: boolean): void {
    this.selectedSortText = `Wohnfläche ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a, b) =>
      ascending ? a.squareMeter - b.squareMeter : b.squareMeter - a.squareMeter
    );
  }

  /**
   * Calculates the total number of rooms of an accommodation.
   * @param accommodation The accommodation to analyze
   * @returns The total room count
   */
  private calculateTotalRooms(accommodation: AccommodationModel): number {
    return (
      (accommodation.numberOfLivingRooms ?? 0) +
      (accommodation.numberOfMixedRooms ?? 0) +
      accommodation.numberOfBedrooms
    );
  }

  /**
   * Sorts the accommodations based on the total number of rooms.
   * @param ascending Whether the sorting is ascending or descending
   */
  sortByNumbersOfRooms(ascending: boolean): void {
    this.selectedSortText = `Anzahl der Räume ${ascending ? 'aufsteigend' : 'absteigend'}`;
    this.filteredAccommodations.sort((a, b) =>
      ascending
        ? this.calculateTotalRooms(a) - this.calculateTotalRooms(b)
        : this.calculateTotalRooms(b) - this.calculateTotalRooms(a)
    );
  }
}
