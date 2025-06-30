using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Season
{
    public int Id { get; set; }
    [MaxLength(255)] public string? Title { get; set; }
    public DateOnly StartsAt { get; set; }
    public DateOnly EndsAt { get; set; }

    public List<SeasonPricing> SeasonPricings { get; set; } = new List<SeasonPricing>();
}