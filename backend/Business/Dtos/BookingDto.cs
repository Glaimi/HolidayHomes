namespace Business.Dtos;

public class BookingDto
{
    public int Id { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public int AccommodationId { get; set; }
    public string? AccommodationName { get; set; }
}