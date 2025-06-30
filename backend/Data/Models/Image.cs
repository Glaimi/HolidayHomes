using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Image
{
    public int Id { get; set; }
    [MaxLength(255)] public string? FilePath { get; set; }
    [MaxLength(255)] public string? AltText { get; set; }

    //     n : 1
    // Image : Accommodation
    public int AccommodationId { get; set; }
    public Accommodation Accommodation { get; set; }
}