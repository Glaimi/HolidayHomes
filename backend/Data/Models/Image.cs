using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Image
{
    /// <summary>
    /// Unique identifier for the image.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// File path or URL of the image, max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? FilePath { get; set; }

    /// <summary>
    /// Alternative text for the image (used for accessibility and SEO), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? AltText { get; set; }


    /// <summary>
    /// Foreign key referencing the associated accommodation.
    /// </summary>
    //     n : 1
    // Image : Accommodation
    public int AccommodationId { get; set; }
    public Accommodation Accommodation { get; set; }
}
