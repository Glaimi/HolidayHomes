using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class SeasonRepository
{
    private readonly HolidayHomeDbContext _dataContext;

    public SeasonRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Season>> GetAllSeasons()
    {
        return await _dataContext.Seasons.ToListAsync();
    }
}