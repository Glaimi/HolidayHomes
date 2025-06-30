using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class AccomodationType
{
    public int Id { get; set; }
    [MaxLength(255)] public string? Title { get; set; }
}