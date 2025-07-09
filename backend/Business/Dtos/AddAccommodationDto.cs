namespace Business.Dtos;

public class AddAccommodationDto
{
    public int AccommodationTypeId { get; set; }
    public int KitchenTypeId { get; set; }

    public string? Name { get; set; }
    public string? Street { get; set; }
    public string? City { get; set; }
    public string? Hints { get; set; }
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

    public int BedSheetsAvailability { get; set; }
    public int ShortTripAvailability { get; set; }
    public int TowelsAvailability { get; set; }
}