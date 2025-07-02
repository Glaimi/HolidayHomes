using Business.Dtos;
using Business.Mappers;
using Data.Repositories;

namespace Business.Services;

public class AccommodationService
{
    private AccommodationRepository _accommodationRepository;
    private AccommodationMapper _accommodationMapper;

    public AccommodationService(AccommodationRepository accommodationRepository, AccommodationMapper accommodationMapper)
    {
        _accommodationRepository = accommodationRepository;
        _accommodationMapper = accommodationMapper;
    }

    public async Task<List<AccommodationDto>> GetAllAccommodations()
    {
        var accommodations = await _accommodationRepository.GetAllAccommodations();
        return accommodations.Select(a => _accommodationMapper.MapEntityToDto(a)).ToList();
    }
}
