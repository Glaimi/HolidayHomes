using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

public class AccommodationMapper
{

    public AccommodationDto MapEntityToDto(Accommodation entity)
    {
        return new AccommodationDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Hints = entity.Hints,
            LandLordName = entity.LandLordName,
            SquareMeter = entity.SquareMeter,
            NumberOfBedrooms = entity.NumberOfBedrooms,
            NumberOfBeds = entity.NumberOfBeds,
            NumberOfMixedRooms = entity.NumberOfMixedRooms,
            NumberOfLivingRooms = entity.NumberOfLivingRooms,
            IsDogAllowed = entity.IsDogAllowed,
            IsWifiAvailable = entity.IsWifiAvailable,
            IsNonSmoking = entity.IsNonSmoking,
            IsTelevisionAvailable = entity.IsTelevisionAvailable,
            IsWashingMachineAvailable = entity.IsWashingMachineAvailable,
            IsParkingAvailable = entity.IsParkingAvailable,
            IsSaunaAvailable = entity.IsSaunaAvailable,
            BedSheetsAvailability = entity.BedSheetsAvailability,
            ShortTripAvailability = entity.ShortTripAvailability,
            TowelsAvailability = entity.TowelsAvailability,
            AccommodationTypeId = entity.AccommodationTypeId,
            KitchenTypeId = entity.KitchenTypeId
        };
    }
}
