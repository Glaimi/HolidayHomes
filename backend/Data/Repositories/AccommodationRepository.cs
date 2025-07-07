using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class AccommodationRepository : IAccommodationRepository
{
    private HolidayHomeDbContext _dataContext;

    //    /// <summary>
    //    /// Initializes a new instance of the <see cref="AccommodationRepository"/> class.
    //    /// </summary>
    //    /// <param name="dataContext">Injected database context used for data access.</param>
    public AccommodationRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Accommodation> SaveAccommodationAsync(Accommodation accommodation)
    {
        _dataContext.Accommodations.Add(accommodation);
        await _dataContext.SaveChangesAsync();

        return accommodation;
    }

    public async Task<IEnumerable<Accommodation>> GetAllAccommodationsAsync()
    {
        return _dataContext.Accommodations
            .Include(a => a.AccommodationType)
            .Include(a => a.Address)
            .Include(a => a.KitchenType)
            .Include(a => a.Images)
            .Include(a => a.SeasonPricings)
            .ThenInclude(sp => sp.Season);
    }

    public Task<int> GetAccommodationsCountAsync()
    {
        return _dataContext.Accommodations.CountAsync();
    }
}
