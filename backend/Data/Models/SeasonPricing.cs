namespace Data.Models;

public class SeasonPricing
{
    /// <summary>
    /// Price for the accommodation during the specific season.
    /// </summary>
    public double Price { get; set; }

    /// <summary>
    /// Indicates if the accommodation is bookable in this season.
    /// </summary>
    public bool IsBookable { get; set; }

    // Relationship: many SeasonPricings belong to one Season

    /// <summary>
    /// Foreign key to the associated Season.
    /// </summary>
    //             n : 1
    // SeasonPricing : Season
    public int SeasonId { get; set; }

    /// <summary>
    /// Navigation property to the related Season entity.
    /// </summary>
    public Season Season { get; set; }

    // Relationship: many SeasonPricings belong to one Accommodation

    /// <summary>
    /// Foreign key to the associated Accommodation.
    /// </summary>
    //             n : 1
    // SeasonPricing : Accommodation
    public int AccommodationId { get; set; }

    /// <summary>
    /// Navigation property to the related Accommodation entity.
    /// </summary>
    public Accommodation Accommodation { get; set; }
}
