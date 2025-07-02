using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace Data.Repositories;

public class AccommodationRepository : IAccommodationRepository
{
    private readonly HolidayHomeDbContext _dataContext;

    public AccommodationRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }



    public async Task<IEnumerable<Accommodation>> GetAllAccommodations()
    {
        return await _dataContext.Accommodations
            .AsNoTracking()
            .ToListAsync();

    }


}
