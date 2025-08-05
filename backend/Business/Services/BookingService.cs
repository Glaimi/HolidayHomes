using Business.Dtos;
using Business.Mappers;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class BookingService
{
    private readonly BookingRepository _bookingRepository;

    public BookingService(BookingRepository bookingRepository)
    {
        _bookingRepository = bookingRepository;
    }

    public async Task AddAsync(BookingDto dto)
    {
        // Validierung: Enddatum muss nach oder gleich Startdatum sein
        if (dto.EndDate < dto.StartDate)
            throw new ArgumentException("Das Enddatum muss nach dem Startdatum liegen.");

        // Prüfe auf Überschneidung für dieselbe Unterkunft
        var overlapping = (await _bookingRepository.GetByAccommodationIdAsync(dto.AccommodationId))
            .Any(b =>
                dto.StartDate <= b.EndDate && dto.EndDate >= b.StartDate
            );

        if (overlapping)
            throw new InvalidOperationException("Für diese Unterkunft existiert bereits eine Buchung im angegebenen Zeitraum.");

        var entity = BookingMapper.ToEntity(dto);
        await _bookingRepository.AddAsync(entity);
    }

    public async Task DeleteAsync(int id)
        => await _bookingRepository.DeleteAsync(id);

    // NEU: Alle Bookings zu einer AccommodationId als DTOs
    public async Task<List<BookingDto>> GetBookingsByAccommodationIdAsync(int accommodationId)
    {
        var bookings = await _bookingRepository.GetByAccommodationIdAsync(accommodationId);
        return bookings.Select(BookingMapper.ToDto).ToList();
    }
}