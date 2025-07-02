using System.ComponentModel.DataAnnotations;
using Data.Enums;

namespace Data.Models;

public class Accommodation
{
    public int Id { get; set; }
    [MaxLength(255)] public string? Name { get; set; }
    public string? LandLordName { get; set; }
    public string? Hints { get; set; }

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

    //             1 : 1
    // Accommodation : Address
    public int AddressId { get; set; }
    public Address? Address { get; set; }

    //             n : 1
    // Accommodation : AccommodationType
    public int AccommodationTypeId { get; set; }
    public AccommodationType? AccommodationType { get; set; }

    //             n : 1
    // Accommodation : KitchenType
    public int KitchenTypeId { get; set; }
    public KitchenType? KitchenType { get; set; }

    //             1 : n
    // Accommodation : SeasonPricing
    public List<SeasonPricing> SeasonPricings { get; set; } = new List<SeasonPricing>();

    //             1 : n
    // Accommodation : AccommodationSanitaryInfo
    public List<AccommodationSanitaryInfo> AccommodationSanitaryInfos { get; set; } =
        new List<AccommodationSanitaryInfo>();

    //             1 : n
    // Accommodation : Image
    public List<Image> Images { get; set; } = new List<Image>();
}
