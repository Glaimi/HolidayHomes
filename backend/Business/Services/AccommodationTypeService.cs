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

    public async Task<AccommodationType> GetAccommodationTypeByTitleAsync(string title)
    {
        AccommodationType? accommodationType =
            await _accommodationTypeRepository.GetAccommodationTypeByTitleAsync(title);

        if (accommodationType == null)
        {
            AccommodationType typeToAdd = new AccommodationType() { Title = title };
            await _accommodationTypeRepository.SaveAccommodationTypeAsync(typeToAdd);

            return typeToAdd;
        }

        return accommodationType;
    }
}