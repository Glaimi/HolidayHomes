using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class Address
{
    public int Id { get; set; }
    [MaxLength(255)] public string Street { get; set; }
    [MaxLength(255)] public string City { get; set; }

    //       1 : 1
    // Address : Accommodation
    public Accommodation? Accommodation { get; set; }
}
