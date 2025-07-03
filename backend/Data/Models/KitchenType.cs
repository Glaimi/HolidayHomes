using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class KitchenType
{
    /// <summary>
    /// Unique identifier for the kitchen type.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Short abbreviation or code for the kitchen type (e.g., "KT", "FULL").
    /// Useful for display in compact UI elements.
    /// </summary>
    public string Abbreviation { get; set; }

    /// <summary>
    /// Title or name of the kitchen type (e.g., Open Kitchen, Closed Kitchen), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Title { get; set; }
}
