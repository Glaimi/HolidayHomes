namespace Data.Models;


public class AccommodationSanitaryInfo
{
    /// <summary>
    /// Foreign key to the related accommodation.
    /// Many sanitary info entries can belong to one accommodation.
    /// </summary>
    //                         n : 1
    // AccommodationSanitaryInfo : Accommodation
    public int AccommodationId { get; set; }

    /// <summary>
    /// Navigation property to the accommodation entity.
    /// </summary>
    public Accommodation? Accommodation { get; set; }

    /// <summary>
    /// Foreign key to the sanitary type (e.g., toilet, shower).
    /// Many sanitary info entries can share the same sanitary type.
    /// </summary>
    //                         n : 1
    // AccommodationSanitaryInfo : SanitaryType
    public int SanitaryTypeId { get; set; }

    /// <summary>
    /// Navigation property to the sanitary type entity.
    /// </summary>
    public SanitaryType? SanitaryType { get; set; }

    /// <summary>
    /// Quantity or amount of the sanitary type available in the accommodation.
    /// </summary>
    public int Amount { get; set; }
}
