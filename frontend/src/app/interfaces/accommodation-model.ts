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

export interface AccommodationModel {
  id: number;
  name: string;
  description?: string;
  images?: Image[];
  image?: string; // Legacy property, can be removed after migration
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
  seasonPricing: SeasonPricing[] | string; // Can be string for legacy support
  street: string;
  city: string;
  postalCode?: string;
  country?: string;
  kitchenType: string;
  maxOccupancy?: number;
  floor?: number;
  checkInTime?: string;
  checkOutTime?: string;
  distanceToCityCenter?: number;
  distanceToPublicTransport?: number;
  rating?: number;
  reviewCount?: number;
}
