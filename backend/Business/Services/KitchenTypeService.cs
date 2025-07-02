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

    public async Task<KitchenType> GetKitchenTypeByTitleAsync(string title)
    {
        KitchenType? kitchenType =  await _kitchenTypeRepository.GetKitchenTypeByTitleAsync(title);

        if (kitchenType == null)
        {
            KitchenType typeToAdd = new KitchenType() { Title = title };
            await _kitchenTypeRepository.SaveKitchenTypeAsync(typeToAdd);

            return typeToAdd;
        }

        return kitchenType;
    }
}