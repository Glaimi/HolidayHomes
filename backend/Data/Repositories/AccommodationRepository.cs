using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace Data.Repositories;

/// <summary>
/// Repository implementation for accessing accommodation data from the database.
/// </summary>
public class AccommodationRepository : IAccommodationRepository
{
    private readonly HolidayHomeDbContext _dataContext;


    /// <summary>
    /// Initializes a new instance of the <see cref="AccommodationRepository"/> class.
    /// </summary>
    /// <param name="dataContext">Injected database context used for data access.</param>
    public AccommodationRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }


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


}
