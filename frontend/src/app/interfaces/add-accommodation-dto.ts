import {SanitaryInfoModel} from './sanitary-info-model';
import {AddSeasonPricingDto} from './add-season-pricing-dto';

export interface AddAccommodationDto {
  accommodationTypeId: number;
  kitchenTypeId: number;
  name: string;
  street: string;
  city: string;
  hints: string;
  landLordName: string;
  squareMeter: number;
  numberOfBedrooms: number;
  numberOfBeds: number;
  numberOfMixedRooms: number;
  numberOfLivingRooms: number;
  isDogAllowed: boolean;
  isWifiAvailable: boolean;
  isNonSmoking: boolean;
  isTelevisionAvailable: boolean;
  isWashingMachineAvailable: boolean;
  isParkingAvailable: boolean;
  isSaunaAvailable: boolean;
  bedSheetsAvailability: number;
  shortTripAvailability: number;
  towelsAvailability: number;
  accommodationSanitaryInfos: SanitaryInfoModel[]
  seasonPricings: AddSeasonPricingDto[]
}
