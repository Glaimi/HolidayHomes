using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class AccommodationTypeRepository
{
    private HolidayHomeDbContext _dataContext;

    public AccommodationTypeRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<AccommodationType?> GetAccommodationTypeByTitleAsync(string title)
    {
        return await _dataContext.AccommodationTypes
            .FirstOrDefaultAsync(at => at.Title.ToLower().Equals(title.ToLower()));
    }
}