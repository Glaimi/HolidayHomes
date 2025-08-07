using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class KitchenTypeRepository
{
    private HolidayHomeDbContext _dataContext;

    public KitchenTypeRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<KitchenType> SaveKitchenTypeAsync(KitchenType kitchenType)
    {
        _dataContext.KitchenTypes.Add(kitchenType);
        await _dataContext.SaveChangesAsync();

        return kitchenType;
    }

    public async Task<KitchenType?> GetKitchenTypeByIdAsync(int kitchenTypeId)
    {
        return await _dataContext.KitchenTypes.FindAsync(kitchenTypeId);
    }

    public async Task<List<KitchenType>> GetAllKitchenTypes()
    {
        return await _dataContext.KitchenTypes.ToListAsync();
    }

    public async Task<KitchenType?> GetKitchenTypeByAbbreviationAsync(string abbreviation)
    {
        return await _dataContext.KitchenTypes.FirstOrDefaultAsync(kt =>
            kt.Abbreviation.ToLower().Equals(abbreviation.ToLower()));
    }
}