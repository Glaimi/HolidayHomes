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

    public async Task<KitchenType> GetKitchenTypeByTitleOrDefaultAsync(string title)
    {
        KitchenType? kitchenType =  await _kitchenTypeRepository.GetKitchenTypeByTitleAsync(title);

        return kitchenType ?? new KitchenType { Id = 0, Title = title };
    }
}