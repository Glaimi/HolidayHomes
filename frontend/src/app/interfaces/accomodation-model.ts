import {SanitaryTypeModel} from './sanitary-type-model';
import {PicturesModel} from './pictures-model';
import {LandlordModel} from './landlord-model';
import {SeasonPricingModel} from './season-pricing-model';
import {AdressModel} from './adress-model';
import {KitchenTypeModel} from './kitchen-type-model';

export interface AccomodationModel {
  id: number;
  name: string;
  picture: PicturesModel[];
  numberOfBeds: number;
  shortTrip: boolean;
  numberOfMixedRooms: number;
  numberOfLivingRooms: number;
  hints: string;
  towels: boolean;
  washingMachine: boolean;
  television: boolean;
  bedSheets: boolean;
  nonSmoking: boolean;
  sauna: boolean;
  parking: boolean;
  dogsAllowed: boolean;
  numberOfBedrooms: number;
  wifi: boolean;
  numberOfSanitaryFacilities: number;
  squareMeter: number;
  sanitaryType: SanitaryTypeModel[];
  accomodationType: AccomodationModel[];
  landlord: LandlordModel[];
  seasonPricing: SeasonPricingModel[];
  adress: AdressModel[];
  kitchenType: KitchenTypeModel[];





}
