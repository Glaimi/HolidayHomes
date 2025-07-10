import {Component, inject, OnInit} from '@angular/core';
import {KitchenTypeService} from "../../services/kitchen-type-service";
import {KitchenTypeModel} from '../../interfaces/kitchen-type-model';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccommodationTypeService} from '../../services/accommodation-type-service';
import {AccommodationTypeModel} from '../../interfaces/accommodation-type-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccommodationModel} from '../../interfaces/accommodation-model';

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

  public formGroup: FormGroup = new FormGroup({
    accommodationType: new FormControl(1),
    landlordName: new FormControl(''),
    accommodationName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    squareMeters: new FormControl(0),
    numberOfBeds: new FormControl(0),
    numberOfBedrooms: new FormControl(0),
    numberOfLivingRooms: new FormControl(0),
    numberOfMixedRooms: new FormControl(0),
    numberOfBathtubs: new FormControl(0),
    numberOfShowers: new FormControl(0),
    kitchenType: new FormControl(1),
    seasonABookable: new FormControl(false),
    seasonAPrice: new FormControl(0),
    seasonBBookable: new FormControl(false),
    seasonBPrice: new FormControl(0),
    seasonCBookable: new FormControl(false),
    seasonCPrice: new FormControl(0),
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

  public minSquareMeters: number = 50;
  public maxSquareMeters: number = 500;
  public minNumberOfBeds: number = 1;
  public maxNumberOfBeds: number = 8;
  public minNumberOfBedrooms: number = 0;
  public maxNumberOfBedrooms: number = 8;
  public minNumberOfLivingRooms: number = 0;
  public maxNumberOfLivingRooms: number = 8;
  public minNumberOfMixedRooms: number = 0;
  public maxNumberOfMixedRooms: number = 8;
  public minNumberOfBathtubs: number = 0;
  public maxNumberOfBathtubs: number = 4;
  public minNumberOfShowers: number = 0;
  public maxNumberOfShowers: number = 4;

  ngOnInit(): void {
    this.accommodationTypes$ = this.accommodationTypeService.getAllAccommodationTypes();
    this.kitchenTypes$ = this.kitchenTypeService.getAllKitchenTypes();
  }

  onSubmit(): void {
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

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
        accommodationSanitaryInfos: this.getSanitaryInfos()
      };

      this.http.post<AccommodationModel>(this.baseUrl, accommodationDto, options).subscribe(accommodation => {
        console.log(accommodation);
      });
    } else {
      console.warn('Unvollständige Formulardaten');
    }
  }

  getSanitaryInfos(): { sanitaryTypeId: number, amount: number}[] {
    return [
      { sanitaryTypeId: 1, amount: this.formGroup.get('numberOfShowers')?.value ?? 0 },
      { sanitaryTypeId: 2, amount: this.formGroup.get('numberOfBathtubs')?.value ?? 0 }
    ];
  }
}
