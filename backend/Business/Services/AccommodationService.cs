using Business.Dtos;
using Business.Mappers;
using Data.Repositories;

namespace Business.Services;

public class AccommodationService : IAccommodationService
{
    private readonly IAccommodationRepository _accommodationRepository;
    private readonly AccommodationMapper _accommodationMapper;

    public AccommodationService(IAccommodationRepository accommodationRepository, AccommodationMapper accommodationMapper)
    {
        _accommodationRepository = accommodationRepository;
        _accommodationMapper = accommodationMapper;
    }

    public async Task<List<AccommodationDto>> GetAllAccommodations()
    {
        var accommodations = await _accommodationRepository.GetAllAccommodations();
        return accommodations
            .Select(a => _accommodationMapper.MapEntityToDto(a))
            .ToList();
    }
}
