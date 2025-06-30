using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class AccommodationType
{
    public int Id { get; set; }
    [MaxLength(255)] public string? Title { get; set; }

    //                 1 : n
    // AccommodationType : Accommodation
    public List<Accommodation> Accommodations { get; set; } = new List<Accommodation>();
}