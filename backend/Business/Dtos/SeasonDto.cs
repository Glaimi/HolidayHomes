namespace Business.Dtos;

public class SeasonDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int StartDay { get; set; }
    public int StartMonth { get; set; }
    public int EndDay { get; set; }
    public int EndMonth { get; set; }
}