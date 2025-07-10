import {SeasonPricingModel} from './season-pricing-model';

export interface SeasonPricing {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  accommodationId: number;
}

export interface Image {
  id: number;
  url: string;
  isMain: boolean;
  accommodationId: number;
}

export interface AccommodationSanitaryInfo {
  title: string;
  amount: number;
}

export interface AccommodationModel {
  id: number;
  name: string;
  description?: string;
  images?: Image[];
  image?: string; // Legacy property, can be removed after migration
  numberOfBeds: number;
  shortTripAvailability: boolean;
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
  squareMeter: number;
  sanitaryInfos?: AccommodationSanitaryInfo[];
  kitchen: string;
  type: string;
  landLordName: string;
  seasonPricings: SeasonPricingModel[]; // Can be string for legacy support
  street: string;
  city: string;
  postalCode?: string;
  country?: string;
  maxOccupancy?: number;
  floor?: number;
  checkInTime?: string;
  checkOutTime?: string;
  distanceToCityCenter?: number;
  distanceToPublicTransport?: number;
  rating?: number;
  reviewCount?: number;
  currentPrice?: number;
}
