using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class SanitaryType
{
    /// <summary>
    /// Unique identifier for the sanitary type.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Title or description of the sanitary type (e.g., Bathroom, Toilet), max length 255 characters.
    /// </summary>
    [MaxLength(255)] public string? Title { get; set; }

    /// <summary>
    /// Navigation property representing the one-to-many relationship
    /// between SanitaryType and AccommodationSanitaryInfo.
    /// A sanitary type can be associated with multiple sanitary info entries.
    /// </summary>
    //            1 : n
    // SanitaryType : AccommodationSanitaryInfo
    public List<AccommodationSanitaryInfo> AccommodationSanitaryInfos { get; set; } =
        new List<AccommodationSanitaryInfo>();
}
