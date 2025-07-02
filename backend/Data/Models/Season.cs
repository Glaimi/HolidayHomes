using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Season
{
    /// <summary>
    /// Unique identifier for the season.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Title or name of the season (e.g., Summer, Winter), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Title { get; set; }

    /// <summary>
    /// Start date of the season.
    /// </summary>
    public DateOnly StartsAt { get; set; }

    /// <summary>
    /// End date of the season.
    /// </summary>
    public DateOnly EndsAt { get; set; }

    /// <summary>
    /// Navigation property representing the one-to-many relationship
    /// between Season and SeasonPricing.
    /// A season can have multiple pricing entries.
    /// </summary>
    //      1 : n
    // Season : SeasonPricing
    public List<SeasonPricing> SeasonPricings { get; set; } = new List<SeasonPricing>();
}
