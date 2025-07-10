using Business.Dtos;
using Business.Services;
using Data.Enums;
using Data.Models;

namespace Business.Mappers;

/// <summary>
/// Responsible for mapping Accommodation entities to DTOs.
/// This helps decouple the domain model from the API layer.
/// </summary>
public class AccommodationMapper
{
    private readonly AddressService _addressService;
    private readonly SeasonPricingService _seasonPricingService;
    private readonly SeasonPricingMapper _seasonPricingMapper;

    public AccommodationMapper(AddressService addressService, SeasonPricingService seasonPricingService,
        SeasonPricingMapper seasonPricingMapper)
    {
        _addressService = addressService;
        _seasonPricingService = seasonPricingService;
        _seasonPricingMapper = seasonPricingMapper;
    }

    private string MapAvailabilityToGerman(Availability availability)
    {
        return availability switch
        {
            Availability.Available => "Verfügbar",
            Availability.Unavailable => "Nicht verfügbar",
            Availability.ExtraCharge => "Gegen Aufpreis",
            _ => "Unbekannt"
        };
    }

    /// <summary>
    /// Maps an Accommodation entity to an AccommodationDto.
    /// </summary>
    /// <param name="entity">The Accommodation entity to be mapped.</param>
    /// <returns>The corresponding AccommodationDto.</returns>
    public async Task<AccommodationDto> MapEntityToDto(Accommodation entity)
    {
        return new AccommodationDto
        {
            Id = entity.Id,
            Type = entity.AccommodationType!.Title,
            Name = entity.Name,
            Street = entity.Address!.Street,
            City = entity.Address!.City,
            Hints = entity.Hints,
            LandLordName = entity.LandLordName,
            SquareMeter = entity.SquareMeter,
            Kitchen = entity.KitchenType!.Title,
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
            BedSheetsAvailability = MapAvailabilityToGerman(entity.BedSheetsAvailability),
            ShortTripAvailability = MapAvailabilityToGerman(entity.ShortTripAvailability),
            TowelsAvailability = MapAvailabilityToGerman(entity.TowelsAvailability),
            SeasonPricings = await _seasonPricingService.GetSeasonPricingsByAccommodationIdAsync(entity.Id),
            CurrentPrice = await _seasonPricingService.GetCurrentPriceByAccommodationIdAsync(entity.Id, DateTime.Now),
            SanitaryInfos = SanitaryMapper.MapEntityToDto(entity.AccommodationSanitaryInfos)
        };
    }

    public async Task<Accommodation> MapDtoToEntity(AddAccommodationDto dto)
    {
        return new Accommodation
        {
            Name = dto.Name,
            LandLordName = dto.LandLordName,
            Hints = dto.Hints,
            SquareMeter = dto.SquareMeter,
            NumberOfBedrooms = dto.NumberOfBedrooms,
            NumberOfBeds = dto.NumberOfBeds,
            NumberOfMixedRooms = dto.NumberOfMixedRooms,
            NumberOfLivingRooms = dto.NumberOfLivingRooms,
            IsDogAllowed = dto.IsDogAllowed,
            IsWifiAvailable = dto.IsWifiAvailable,
            IsNonSmoking = dto.IsNonSmoking,
            IsTelevisionAvailable = dto.IsTelevisionAvailable,
            IsWashingMachineAvailable = dto.IsWashingMachineAvailable,
            IsParkingAvailable = dto.IsParkingAvailable,
            IsSaunaAvailable = dto.IsSaunaAvailable,
            BedSheetsAvailability = (Availability)dto.BedSheetsAvailability,
            ShortTripAvailability = (Availability)dto.ShortTripAvailability,
            TowelsAvailability = (Availability)dto.TowelsAvailability,
            Address = await _addressService.GetAddressByStreetAndCityAsync(dto.Street!, dto.City!),
            AccommodationTypeId = dto.AccommodationTypeId,
            KitchenTypeId = dto.KitchenTypeId,
            SeasonPricings = _seasonPricingMapper.MapDtosToEntities(dto.SeasonPricings),
            AccommodationSanitaryInfos = dto.AccommodationSanitaryInfos,
            Images = []
        };
    }
}