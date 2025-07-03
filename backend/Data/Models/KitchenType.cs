using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class KitchenType
{
    /// <summary>
    /// Unique identifier for the kitchen type.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Title or name of the kitchen type (e.g., Open Kitchen, Closed Kitchen), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Title { get; set; }
}
