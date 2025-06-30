namespace Data.Models;

public class SeasonPricing
{
   public int SeasonId { get; set; }
   public int AccomodationId { get; set; }

   public double Price { get; set; }
   public bool IsBookable { get;set; }

   public Season Season { get; set; }
   public Accomodation Accomodation { get; set; }
}