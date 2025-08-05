using System;
using System.Threading.Tasks;
using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class BookingRepository
{
    private readonly HolidayHomeDbContext _dbContext;

    public BookingRepository(HolidayHomeDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Booking booking)
    {
        _dbContext.Bookings.Add(booking);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var booking = await _dbContext.Bookings.FindAsync(id);
        if (booking != null)
        {
            _dbContext.Bookings.Remove(booking);
            await _dbContext.SaveChangesAsync();
        }
    }

    // Hilfsmethode für Überschneidungsprüfung im Service
    public async Task<List<Booking>> GetByAccommodationIdAsync(int accommodationId)
    
        => await _dbContext.Bookings
            .Include(b => b.Accommodation)
            .Where(b => b.AccommodationId == accommodationId)
            .ToListAsync();
    
}