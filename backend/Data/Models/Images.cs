using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Images
{
    public int Id { get; set; }
    [MaxLength(255)] public string? FilePath { get; set; }
    [MaxLength(255)] public string? AltText { get; set; }

}