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

export interface SeasonPricingCalculate {
  seasonTitle?: string;
  startDay?: number;
  startMonth?:number;
  endDay?:number;
  endMonth?: number;
  price?: number;
}
// import { SeasonPricingModel } from './season-pricing-model';
//
// /**
//
//  * Saisonpreis einer Unterkunft
//
//  */
//
// export interface SeasonPricing {
//
//   id: number;
//
//   startDate: string;       // Format: yyyy-MM-dd
//
//   endDate: string;         // Format: yyyy-MM-dd
//
//   price: number;           // Preis pro Nacht
//
//   accommodationId: number; // Referenz auf die Unterkunft
//
// }
//
// /**
//
//  * Bild einer Unterkunft
//
//  */
//
// export interface Image {
//
//   id: number;
//
//   url: string;
//
//   isMain: boolean;
//
//   accommodationId: number;
//
// }
//
// /**
//
//  * Sanitärinformation einer Unterkunft (z. B. Anzahl Duschen oder WCs)
//
//  */
//
// export interface AccommodationSanitaryInfo {
//
//   title: string;
//
//   amount: number;
//
// }
//
// /**
//
//  * Hauptmodell einer Unterkunft
//
//  */
//
// export interface AccommodationModel {
//
//   id: number;
//
//   name: string;
//
//   description?: string;
//
//   images?: Image[];
//
//   image?: string; // Veraltet, sollte entfernt werden
//
//   numberOfBeds: number;
//
//   numberOfBedrooms: number;
//
//   numberOfLivingRooms: number;
//
//   numberOfMixedRooms: number;
//
//   shortTripAvailability: boolean;
//
//   towelsAvailability: boolean;
//
//   bedSheetsAvailability: boolean;
//
//   kitchen: string;
//
//   hints: string;
//
//   isWifiAvailable: boolean;
//
//   isDogAllowed: boolean;
//
//   isNonSmoking: boolean;
//
//   isTelevisionAvailable: boolean;
//
//   isWashingMachineAvailable: boolean;
//
//   isParkingAvailable: boolean;
//
//   isSaunaAvailable: boolean;
//
//   sanitaryInfos?: AccommodationSanitaryInfo[];
//
//   squareMeter: number;
//
//   type: string;
//
//   landLordName: string;
//
//   seasonPricings: SeasonPricingModel[]; // Aktuelle Saisonpreise
//
//   // Adressinformationen
//
//   street: string;
//
//   city: string;
//
//   postalCode?: string;
//
//   country?: string;
//
//   // Weitere optionale Informationen
//
//   maxOccupancy?: number;
//
//   floor?: number;
//
//   checkInTime?: string;
//
//   checkOutTime?: string;
//
//   distanceToCityCenter?: number;
//
//   distanceToPublicTransport?: number;
//
//   // Bewertungen und Preis
//
//   rating?: number;
//
//   reviewCount?: number;
//
//   currentPrice?: number; // ggf. berechneter Gesamtpreis
//
// }
//
// /**
//
//  * DTO für berechnete Saisonpreise
//
//  */
//
// export interface SeasonPrisingCalculate {
//
//   seasonTitle?: string;
//
//   startDay?: number;
//
//   startMonth?: number;
//
//   endDay?: number;
//
//   endMonth?: number;
//
//   price?: number; // Gesamtpreis über den gewählten Zeitraum
//
// }

