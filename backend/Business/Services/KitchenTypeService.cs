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

    public async Task<KitchenType?> GetKitchenTypeByAbbreviationAsync(string abbreviation)
    {
        return await _kitchenTypeRepository.GetKitchenTypeByAbbreviationAsync(abbreviation);
    }
}