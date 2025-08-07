namespace Business.Dtos;

public class AddSeasonPricingDto
{
    public int SeasonId { get; set; }
    public bool IsBookable { get; set; }
    public double Price { get; set; }
}