using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Accomodation
{
    public int Id { get; set; }
    [MaxLength(255)] public string? Name { get; set; }
    public string? Hints { get; set; }

    public int SquareMeter { get; set; }
    public int NumberOfSanitaryFacilities { get; set; }
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

    public List<LandLord> LandLords { get; set; } = new List<LandLord>();
    public Address Address { get; set; }
    public List<SeasonPricing> SeasonPricings { get; set; } = new List<SeasonPricing>();


}