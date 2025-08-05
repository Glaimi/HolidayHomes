import {Component, inject, OnInit} from '@angular/core';
import {KitchenTypeService} from "../../services/kitchen-type-service";
import {KitchenTypeModel} from '../../interfaces/kitchen-type-model';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {AccommodationTypeService} from '../../services/accommodation-type-service';
import {AccommodationTypeModel} from '../../interfaces/accommodation-type-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccommodationModel} from '../../interfaces/accommodation-model';
import {SeasonService} from "../../services/season-service";
import {SeasonModel} from "../../interfaces/season-model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-accommodation-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './accommodation-form.html',
  styleUrl: './accommodation-form.scss'
})
export class AccommodationForm implements OnInit {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:5152/api/Accommodation';

  // Needed for retrieving and displaying available accommodation types in the form
  private accommodationTypeService: AccommodationTypeService = inject(AccommodationTypeService);
  public accommodationTypes$!: Observable<AccommodationTypeModel[]>;

  // Needed for retrieving and displaying available kitchen types in the form
  private kitchenTypeService: KitchenTypeService = inject(KitchenTypeService);
  public kitchenTypes$!: Observable<KitchenTypeModel[]>;

  // Needed for retrieving and working with existing seasons
  private seasonService: SeasonService = inject(SeasonService);
  public seasons$!: Observable<SeasonModel[]>;

  public minSquareMeters: number = 0;
  public minNumberOfBeds: number = 0;
  public minNumberOfBedrooms: number = 0;
  public minNumberOfLivingRooms: number = 0;
  public minNumberOfMixedRooms: number = 0;
  public minNumberOfBathtubs: number = 0;
  public minNumberOfShowers: number = 0;
  public minSeasonAPrice: number = 0.0;
  public minSeasonBPrice: number = 0.0;
  public minSeasonCPrice: number = 0.0;

  public formGroup: FormGroup = new FormGroup({
    accommodationType: new FormControl(1),
    landlordName: new FormControl('', this.notEmptyOrWhitespace),
    accommodationName: new FormControl('', this.notEmptyOrWhitespace),
    street: new FormControl('', this.notEmptyOrWhitespace),
    city: new FormControl('', this.notEmptyOrWhitespace),
    squareMeters: new FormControl(this.minSquareMeters, Validators.min(this.minSquareMeters)),
    numberOfBeds: new FormControl(this.minNumberOfBeds, Validators.min(this.minNumberOfBeds)),
    numberOfBedrooms: new FormControl(this.minNumberOfBedrooms, Validators.min(this.minNumberOfBedrooms)),
    numberOfLivingRooms: new FormControl(this.minNumberOfLivingRooms, Validators.min(this.minNumberOfLivingRooms)),
    numberOfMixedRooms: new FormControl(this.minNumberOfMixedRooms, Validators.min(this.minNumberOfMixedRooms)),
    numberOfBathtubs: new FormControl(this.minNumberOfBathtubs, Validators.min(this.minNumberOfBathtubs)),
    numberOfShowers: new FormControl(this.minNumberOfShowers, Validators.min(this.minNumberOfShowers)),
    kitchenType: new FormControl(1),
    seasonABookable: new FormControl(false),
    seasonAPrice: new FormControl(this.minSeasonAPrice, Validators.min(this.minSeasonAPrice)),
    seasonBBookable: new FormControl(false),
    seasonBPrice: new FormControl(this.minSeasonBPrice, Validators.min(this.minSeasonBPrice)),
    seasonCBookable: new FormControl(false),
    seasonCPrice: new FormControl(this.minSeasonCPrice, Validators.min(this.minSeasonCPrice)),
    shortTripAvailability: new FormControl(0),
    bedsheetsAvailability: new FormControl(0),
    towelsAvailability: new FormControl(0),
    isWifiAvailable: new FormControl(false),
    isDogsAllowed: new FormControl(false),
    isNonSmoking: new FormControl(false),
    isTelevisionAvailable: new FormControl(false),
    isWashingMachineAvailable: new FormControl(false),
    isParkingAvailable: new FormControl(false),
    isSaunaAvailable: new FormControl(false),
    hints: new FormControl('')
  });

  ngOnInit(): void {
    this.accommodationTypes$ = this.accommodationTypeService.getAllAccommodationTypes();
    this.kitchenTypes$ = this.kitchenTypeService.getAllKitchenTypes();
    this.seasons$ = this.seasonService.getAllSeasons();
  }

  onSubmit(): void {
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      // After the season pricings have been created, build the DTO and send it to the API
      this.getSeasonPricings().subscribe(seasonPricings => {
        const accommodationDto = {
          accommodationTypeId: this.formGroup.get('accommodationType')?.value,
          kitchenTypeId: this.formGroup.get('kitchenType')?.value,
          name: this.formGroup.get('accommodationName')?.value,
          street: this.formGroup.get('street')?.value,
          city: this.formGroup.get('city')?.value,
          hints: this.formGroup.get('hints')?.value,
          landLordName: this.formGroup.get('landlordName')?.value,
          squareMeter: this.formGroup.get('squareMeters')?.value,
          numberOfBedrooms: this.formGroup.get('numberOfBedrooms')?.value,
          numberOfBeds: this.formGroup.get('numberOfBeds')?.value,
          numberOfMixedRooms: this.formGroup.get('numberOfMixedRooms')?.value,
          numberOfLivingRooms: this.formGroup.get('numberOfLivingRooms')?.value,
          isDogAllowed: this.formGroup.get('isDogsAllowed')?.value,
          isWifiAvailable: this.formGroup.get('isWifiAvailable')?.value,
          isNonSmoking: this.formGroup.get('isNonSmoking')?.value,
          isTelevisionAvailable: this.formGroup.get('isTelevisionAvailable')?.value,
          isWashingMachineAvailable: this.formGroup.get('isWashingMachineAvailable')?.value,
          isParkingAvailable: this.formGroup.get('isParkingAvailable')?.value,
          isSaunaAvailable: this.formGroup.get('isSaunaAvailable')?.value,
          bedSheetsAvailability: this.formGroup.get('bedsheetsAvailability')?.value,
          shortTripAvailability: this.formGroup.get('shortTripAvailability')?.value,
          towelsAvailability: this.formGroup.get('towelsAvailability')?.value,
          accommodationSanitaryInfos: this.getSanitaryInfos(),
          seasonPricings
        };

        this.http.post<AccommodationModel>(this.baseUrl, accommodationDto, options).subscribe(accommodation => {
          console.log(accommodation);
        });
      })
    } else {
      console.warn('Unvollständige Formulardaten');
    }
  }

  getSanitaryInfos(): { sanitaryTypeId: number, amount: number }[] {
    return [
      {sanitaryTypeId: 1, amount: this.formGroup.get('numberOfShowers')?.value ?? 0},
      {sanitaryTypeId: 2, amount: this.formGroup.get('numberOfBathtubs')?.value ?? 0}
    ];
  }

  getSeasonPricings(): Observable<{ seasonId: number, isBookable: boolean, price: number }[]> {
    return this.seasons$.pipe(map(seasons => seasons.map(season => {
      if (season.title === 'A') {
        return {
          seasonId: season.id,
          isBookable: this.formGroup.get('seasonABookable')?.value,
          price: this.formGroup.get('seasonAPrice')?.value
        }
      } else if (season.title === 'B') {
        return {
          seasonId: season.id,
          isBookable: this.formGroup.get('seasonBBookable')?.value,
          price: this.formGroup.get('seasonBPrice')?.value
        }
      } else {
        return {
          seasonId: season.id,
          isBookable: this.formGroup.get('seasonCBookable')?.value,
          price: this.formGroup.get('seasonCPrice')?.value
        }
      }
    })));
  }

  // Validates that the field is not empty and doesn't contain whitespace only.
  notEmptyOrWhitespace(control: AbstractControl): ValidationErrors | null {
    const isValid: boolean = control.value.trim().length > 0;

    console.log(control.value)

    return isValid ? null : {emptyOrWhitespace: {value: control.value}}
  }

  get landlordName() {
    return this.formGroup.get('landlordName')!;
  }

  get accommodationName() {
    return this.formGroup.get('accommodationName')!;
  }

  get street() {
    return this.formGroup.get('street')!;
  }

  get city() {
    return this.formGroup.get('city')!;
  }

  get squareMeters() {
    return this.formGroup.get('squareMeters')!;
  }

  get numberOfBeds() {
    return this.formGroup.get('numberOfBeds')!;
  }

  get numberOfBedrooms() {
    return this.formGroup.get('numberOfBedrooms')!;
  }

  get numberOfLivingRooms() {
    return this.formGroup.get('numberOfLivingRooms')!;
  }

  get numberOfMixedRooms() {
    return this.formGroup.get('numberOfMixedRooms')!;
  }

  get numberOfShowers() {
    return this.formGroup.get('numberOfShowers')!;
  }

  get numberOfBathtubs() {
    return this.formGroup.get('numberOfBathtubs')!;
  }

  get seasonAPrice() {
    return this.formGroup.get('seasonAPrice')!;
  }

  get seasonBPrice() {
    return this.formGroup.get('seasonBPrice')!;
  }

  get seasonCPrice() {
    return this.formGroup.get('seasonCPrice')!;
  }
}
