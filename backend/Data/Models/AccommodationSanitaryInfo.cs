namespace Data.Models;


public class AccommodationSanitaryInfo
{
    //                         n : 1
    // AccommodationSanitaryInfo : Accommodation
    public int AccommodationId { get; set; }

    public Accommodation? Accommodation { get; set; }

    //                         n : 1
    // AccommodationSanitaryInfo : SanitaryType
    public int SanitaryTypeId { get; set; }


    public SanitaryType? SanitaryType { get; set; }

    public int Amount { get; set; }
}
