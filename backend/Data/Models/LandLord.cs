using System.ComponentModel.DataAnnotations;

namespace Data.Models;

public class LandLord
{
    public int Id { get; set; }
    [MaxLength(255)] public string? FirstName { get; set; }
    [MaxLength(255)] public string? LastName { get; set; }

    //        n : m
    // LandLord : Accommodation
    public List<Accommodation> Accommodations { get; set; }= new List<Accommodation>();
}