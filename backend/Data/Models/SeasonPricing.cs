namespace Data.Models;

public class SeasonPricing
{
   public double Price { get; set; }
   public bool IsBookable { get;set; }

   //             n : 1
   // SeasonPricing : Season
   public int SeasonId { get; set; }
   public Season Season { get; set; }

   //             n : 1
   // SeasonPricing : Accommodation
   public int AccomodationId { get; set; }
   public Accommodation Accommodation { get; set; }
}