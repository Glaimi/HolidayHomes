export interface BookingModel {
  id: number;
  accommodationId: number;
  guestName?: string;
  startDate: string;
  endDate: string;
  // Ergänze hier weitere Felder nach Bedarf
}
