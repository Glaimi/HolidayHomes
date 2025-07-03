import {SanitaryTypeModel} from './sanitary-type-model';
import {PicturesModel} from './pictures-model';
import {LandlordModel} from './landlord-model';
import {SeasonPricingModel} from './season-pricing-model';
import {AdressModel} from './adress-model';
import {KitchenTypeModel} from './kitchen-type-model';

export interface AccomodationModel {
  id: number;
  name: string;
  image: PicturesModel[];
  numberOfBeds: number;
  shortTrip: boolean;
  numberOfMixedRooms: number;
  numberOfLivingRooms: number;
  hints: string;
  towelsAvailability: boolean;
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
  sanitaryType: SanitaryTypeModel[];
  accomodationType: string;
  landLordName: string;
  seasonPricing: SeasonPricingModel[];
  adress: string;
  kitchenType: string;





}
