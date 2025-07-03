using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class AccommodationRepository : IAccommodationRepository
{
    private HolidayHomeDbContext _dataContext;

<<<<<<< Updated upstream
=======

    //    /// <summary>
    //    /// Initializes a new instance of the <see cref="AccommodationRepository"/> class.
    //    /// </summary>
    //    /// <param name="dataContext">Injected database context used for data access.</param>
>>>>>>> Stashed changes
    public AccommodationRepository(HolidayHomeDbContext dataContext)
{
    _dataContext = dataContext;
}

<<<<<<< Updated upstream
    public async Task<Accommodation> SaveAccommodationAsync(Accommodation accommodation)
    {
        _dataContext.Accommodations.Add(accommodation);
        await _dataContext.SaveChangesAsync();

        return accommodation;
    }
=======

/// <summary>
/// Retrieves all accommodation entities from the database.
/// </summary>
/// <returns>
/// A task that represents the asynchronous operation.
/// The task result contains a list of <see cref="Accommodation"/> entities.
/// </returns>
public async Task<IEnumerable<Accommodation>> GetAllAccommodations()
{
    return await _dataContext.Accommodations
        .AsNoTracking()
        .ToListAsync();

}
>>>>>>> Stashed changes

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
