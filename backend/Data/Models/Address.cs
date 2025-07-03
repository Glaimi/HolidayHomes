using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Address
{
    /// <summary>
    /// Unique identifier for the address.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Street name and number, max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Street { get; set; }

    /// <summary>
    /// City name, max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? City { get; set; }


    /// <summary>
    /// Navigation property to the associated accommodation.
    /// One-to-one relationship: each address belongs to exactly one accommodation.
    /// </summary>
    //       1 : 1
    // Address : Accommodation
    public Accommodation? Accommodation { get; set; }
}
