using System.ComponentModel.DataAnnotations;
using Data.Enums;

namespace Data.Models;

public class Accommodation
{
    /// <summary>
    /// Unique identifier for the accommodation.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Name or title of the accommodation, max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Name { get; set; }

    /// <summary>
    /// Name of the landlord or property owner.
    /// </summary>
    public string? LandLordName { get; set; }

    /// <summary>
    /// Additional notes or hints about the accommodation.
    /// </summary>
    public string? Hints { get; set; }

    /// <summary>
    /// Total living area in square meters.
    /// </summary>
    public int SquareMeter { get; set; }

    /// <summary>
    /// Number of bedrooms available.
    /// </summary>
    public int NumberOfBedrooms { get; set; }

    /// <summary>
    /// Number of beds in total.
    /// </summary>
    public int NumberOfBeds { get; set; }

    /// <summary>
    /// Number of mixed-purpose rooms (e.g., study, guest rooms).
    /// </summary>
    public int NumberOfMixedRooms { get; set; }

    /// <summary>
    /// Number of living rooms.
    /// </summary>
    public int NumberOfLivingRooms { get; set; }

    /// <summary>
    /// Indicates whether dogs are allowed on the premises.
    /// </summary>
    public bool IsDogAllowed { get; set; }

    /// <summary>
    /// Indicates if Wi-Fi is available for guests.
    /// </summary>
    public bool IsWifiAvailable { get; set; }

    /// <summary>
    /// Indicates if the accommodation is non-smoking.
    /// </summary>
    public bool IsNonSmoking { get; set; }

    /// <summary>
    /// Indicates if a television is available.
    /// </summary>
    public bool IsTelevisionAvailable { get; set; }

    /// <summary>
    /// Indicates if a washing machine is available.
    /// </summary>
    public bool IsWashingMachineAvailable { get; set; }

    /// <summary>
    /// Indicates if parking is available on the property.
    /// </summary>
    public bool IsParkingAvailable { get; set; }

    /// <summary>
    /// Indicates if sauna facilities are available.
    /// </summary>
    public bool IsSaunaAvailable { get; set; }

    /// <summary>
    /// Availability status of bed sheets (included, extra charge, unavailable).
    /// </summary>
    public Availability BedSheetsAvailability { get; set; }

    /// <summary>
    /// Availability status for short trip bookings.
    /// </summary>
    public Availability ShortTripAvailability { get; set; }

    /// <summary>
    /// Availability status of towels.
    /// </summary>
    public Availability TowelsAvailability { get; set; }

    // --- Navigation properties and relationships ---

    /// <summary>
    /// Foreign key to the associated address entity.
    /// </summary>
    public int AddressId { get; set; }

    /// <summary>
    /// Associated address details (1:1 relationship).
    /// </summary>
    public Address? Address { get; set; }

    /// <summary>
    /// Foreign key to the accommodation type (e.g., apartment, house).
    /// </summary>
    public int AccommodationTypeId { get; set; }

    /// <summary>
    /// The accommodation type entity (many accommodations can share one type).
    /// </summary>
    public AccommodationType? AccommodationType { get; set; }

    /// <summary>
    /// Foreign key to the kitchen type entity.
    /// </summary>
    public int KitchenTypeId { get; set; }

    /// <summary>
    /// The kitchen type entity (many accommodations can share one kitchen type).
    /// </summary>
    public KitchenType? KitchenType { get; set; }

    /// <summary>
    /// Collection of seasonal pricing details for this accommodation (1:n).
    /// </summary>
    public List<SeasonPricing> SeasonPricings { get; set; } = new List<SeasonPricing>();

    /// <summary>
    /// Collection of sanitary information related to the accommodation (1:n).
    /// </summary>
    public List<AccommodationSanitaryInfo> AccommodationSanitaryInfos { get; set; } = new List<AccommodationSanitaryInfo>();

    /// <summary>
    /// Collection of images associated with the accommodation (1:n).
    /// </summary>
    public List<Image> Images { get; set; } = new List<Image>();

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>(); // Collection navigation containing dependents
}
