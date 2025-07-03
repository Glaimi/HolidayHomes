using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class AccommodationTypeService
{
    private AccommodationTypeRepository _accommodationTypeRepository;

    public AccommodationTypeService(AccommodationTypeRepository accommodationTypeRepository)
    {
        _accommodationTypeRepository = accommodationTypeRepository;
    }

    public async Task<AccommodationType?> GetAccommodationTypeByAbbreviationAsync(string abbreviation)
    {
        return await _accommodationTypeRepository.GetAccommodationTypeByAbbreviationAsync(abbreviation);
    }
}