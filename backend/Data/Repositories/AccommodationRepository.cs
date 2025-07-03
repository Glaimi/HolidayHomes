using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class AccommodationRepository
{
    private HolidayHomeDbContext _dataContext;

    public AccommodationRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Accommodation>> GetAllAccommodations()
    {
        List<Accommodation> allAccommodations =
            // await _dataContext.Accommodations.Include(a => a.NumberOfMixedRooms).ToListAsync();
            await _dataContext.Accommodations.ToListAsync();
        return allAccommodations;
        //return null;
    }

    public async Task<Accommodation> SaveAccommodationAsync(Accommodation accommodation)
    {
        _dataContext.Accommodations.Add(accommodation);
        await _dataContext.SaveChangesAsync();

        return accommodation;
    }
}
