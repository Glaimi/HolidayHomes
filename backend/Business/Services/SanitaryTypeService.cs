using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class SanitaryTypeService
{
    private SanitaryTypeRepository _sanitaryTypeRepository;

    public SanitaryTypeService(SanitaryTypeRepository sanitaryTypeRepository)
    {
        _sanitaryTypeRepository = sanitaryTypeRepository;
    }

    public async Task<SanitaryType?> GetSanitaryTypeByIdAsync(int sanitaryTypeId)
    {
        return await _sanitaryTypeRepository.GetSanitaryTypeByIdAsync(sanitaryTypeId);
    }

    public async Task<SanitaryType?> GetSanitaryTypeByAbbreviationAsync(string abbreviation)
    {
        return await _sanitaryTypeRepository.GetSanitaryTypeByAbbreviationAsync(abbreviation);
    }
}