using Data.Enums;

namespace Business.Dtos;

/// <summary>
/// Represents a data transfer object (DTO) for accommodation entities.
/// Used to expose only the necessary fields via the API.
/// </summary>
public class AccommodationDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Hints { get; set; }
    public int AddressId { get; set; }
    public string? LandLordName { get; set; }

    public int SquareMeter { get; set; }
    public int NumberOfBedrooms { get; set; }
    public int NumberOfBeds { get; set; }
    public int NumberOfMixedRooms { get; set; }
    public int NumberOfLivingRooms { get; set; }

    public bool IsDogAllowed { get; set; }
    public bool IsWifiAvailable { get; set; }
    public bool IsNonSmoking { get; set; }
    public bool IsTelevisionAvailable { get; set; }
    public bool IsWashingMachineAvailable { get; set; }
    public bool IsParkingAvailable { get; set; }
    public bool IsSaunaAvailable { get; set; }

    public Availability BedSheetsAvailability { get; set; }
    public Availability ShortTripAvailability { get; set; }
    public Availability TowelsAvailability { get; set; }

    public int AccommodationTypeId { get; set; }
    public int KitchenTypeId { get; set; }


}
