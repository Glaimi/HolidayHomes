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

    public async Task<AccommodationType> GetAccommodationTypeByTitleOrDefaultAsync(string title)
    {
        AccommodationType? accommodationType =
            await _accommodationTypeRepository.GetAccommodationTypeByTitleAsync(title);

        return accommodationType ?? new AccommodationType { Id = 0, Title = title };
    }
}