namespace Data.Models;

public class Booking
{
    public int Id { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public int AccommodationId { get; set; }
    public Accommodation Accommodation { get; set; } = null!;

}