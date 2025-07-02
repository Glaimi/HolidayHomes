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

    public async Task<AccommodationType?> GetAccommodationTypeByTitleAsync(string title)
    {
        return await _accommodationTypeRepository.GetAccommodationTypeByTitleAsync(title);
    }
}