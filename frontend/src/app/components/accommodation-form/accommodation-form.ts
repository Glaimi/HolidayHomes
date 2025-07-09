import {Component, inject, OnInit} from '@angular/core';
import {KitchenTypeService} from "../../services/kitchen-type-service";
import {KitchenTypeModel} from '../../interfaces/kitchen-type-model';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccommodationTypeService} from '../../services/accommodation-type-service';
import {AccommodationTypeModel} from '../../interfaces/accommodation-type-model';

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
    kitchenType: new FormControl(1),
    shortTripAvailability: new FormControl(0),
    bedsheetsAvailability: new FormControl(0),
    towelsAvailability: new FormControl(0),
    isWifiAvailable: new FormControl(false),
    isDogsAllowed: new FormControl(false),
    isNonSmoking: new FormControl(false),
    isTelevisionAvailable: new FormControl(false),
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

  ngOnInit(): void {
    this.accommodationTypes$ = this.accommodationTypeService.getAllAccommodationTypes();
    this.kitchenTypes$ = this.kitchenTypeService.getAllKitchenTypes();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      console.log("Ungültige Formulardaten!");
    }
  }
}
