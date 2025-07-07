namespace Business.Dtos;

public class SeasonPricingDto
{
    public string SeasonTitle { get; set; }
    public int StartDay { get; set; }
    public int StartMonth { get; set; }
    public int EndDay { get; set; }
    public int EndMonth { get; set; }
    public double Price { get; set; }
}