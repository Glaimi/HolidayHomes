import {SanitaryTypeModel} from './sanitary-type-model';
import {PicturesModel} from './pictures-model';
import {SeasonPricingModel} from './season-pricing-model';
import {AdressModel} from './adress-model';


export interface AccomodationModel {
  id: number;
  name: string;
  image: string;
  numberOfBeds: number;
  shortTrip: boolean;
  numberOfMixedRooms: number;
  numberOfLivingRooms: number;
  hints: string;
  towelsAvailable: boolean;
  isWashingMachineAvailable: boolean;
  isTelevisionAvailable: boolean;
  bedSheetsAvailability: boolean;
  isNonSmoking: boolean;
  isSaunaAvailable: boolean;
  isParkingAvailable: boolean;
  isDogAllowed: boolean;
  numberOfBedrooms: number;
  isWifiAvailable: boolean;
  numberOfSanitaryFacilities: number;
  squareMeter: number;
  sanitaryType: string;
  type: string;
  landLordName: string;
  seasonPricing: string;
  street: string;
  city: string;
  kitchenType: string;





}
