using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class AccommodationType
{
    /// <summary>
    /// Unique identifier for the accommodation type.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Title or name of the accommodation type (e.g., Apartment, House), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Title { get; set; }

    /// <summary>
    /// Collection of accommodations associated with this accommodation type (1:n relationship).
    /// </summary>
    public List<Accommodation> Accommodations { get; set; } = new List<Accommodation>();
}
