using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class SeasonPricingRepository
{
    private readonly HolidayHomeDbContext _dataContext;

    public SeasonPricingRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<SeasonPricing>> GetSeasonPricingsByAccommodationIdAsync(int accommodationId)
    {
        return await _dataContext.SeasonPricings
            .Where(sp => sp.AccommodationId == accommodationId)
            .Include(sp => sp.Season)
            .ToListAsync();
    }
}