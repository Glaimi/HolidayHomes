using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

public static class BookingMapper
{
    public static BookingDto ToDto(Booking entity)
        => new BookingDto
        {
            Id = entity.Id,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            AccommodationId = entity.AccommodationId,
            AccommodationName = entity.Accommodation?.Name
        };

    public static Booking ToEntity(BookingDto dto)
        => new Booking
        {
            Id = dto.Id > 0 ? dto.Id : 0,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            AccommodationId = dto.AccommodationId
        };
}