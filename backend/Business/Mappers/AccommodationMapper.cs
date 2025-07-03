using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

/// <summary>
/// Responsible for mapping Accommodation entities to DTOs.
/// This helps decouple the domain model from the API layer.
/// </summary>
public class AccommodationMapper
{
    /// <summary>
    /// Maps an Accommodation entity to an AccommodationDto.
    /// </summary>
    /// <param name="entity">The Accommodation entity to be mapped.</param>
    /// <returns>The corresponding AccommodationDto.</returns>

    public AccommodationDto MapEntityToDto(Accommodation entity)
    {
        return new AccommodationDto
        {
            Id = entity.Id,
            Name = entity.Name,
            AddressId = entity.AddressId,
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
