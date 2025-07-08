using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class SanitaryTypeRepository
{
    private HolidayHomeDbContext _dataContext;

    public SanitaryTypeRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<SanitaryType?> GetSanitaryTypeByAbbreviationAsync(string abbreviation)
    {
        return await _dataContext.SanitaryTypes.FirstOrDefaultAsync(st =>
            st.Abbreviation.ToLower().Equals(abbreviation.ToLower()));
    }
}