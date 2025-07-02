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

    public async Task<KitchenType?> GetKitchenTypeByTitleAsync(string title)
    {
        return await _kitchenTypeRepository.GetKitchenTypeByTitleAsync(title);
    }
}