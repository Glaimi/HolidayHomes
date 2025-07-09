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

    public async Task<AccommodationType> SaveAccommodationTypeAsync(AccommodationType accommodationType)
    {
        _dataContext.AccommodationTypes.Add(accommodationType);
        await _dataContext.SaveChangesAsync();

        return accommodationType;
    }

    public async Task<List<AccommodationType>> GetAllAccommodationTypes()
    {
        return await _dataContext.AccommodationTypes.ToListAsync();
    }

    public async Task<AccommodationType?> GetAccommodationTypeByAbbreviationAsync(string abbreviation)
    {
        return await _dataContext.AccommodationTypes
            .FirstOrDefaultAsync(at => at.Abbreviation.ToLower().Equals(abbreviation.ToLower()));
    }
}