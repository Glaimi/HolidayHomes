using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class KitchenTypeService
{
    private KitchenTypeRepository _kitchenTypeRepository;

    public KitchenTypeService(KitchenTypeRepository kitchenTypeRepository)
    {
        _kitchenTypeRepository = kitchenTypeRepository;
    }

    public async Task<List<KitchenType>> GetAllKitchenTypes()
    {
        return await _kitchenTypeRepository.GetAllKitchenTypes();
    }

    public async Task<KitchenType?> GetKitchenTypeByAbbreviationAsync(string abbreviation)
    {
        return await _kitchenTypeRepository.GetKitchenTypeByAbbreviationAsync(abbreviation);
    }
}