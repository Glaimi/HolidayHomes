using Business.Dtos;
using Business.Mappers;
using Data.Repositories;

namespace Business.Services;

/// <summary>
/// Service class responsible for business logic related to accommodations.
/// </summary>
public class AccommodationService : IAccommodationService
{
    // Repository interface for accessing accommodation data
    private readonly IAccommodationRepository _accommodationRepository;

    // Mapper used to convert between entity and DTO representations
    private readonly AccommodationMapper _accommodationMapper;

    /// <summary>
    /// Constructor with dependencies injected via constructor injection.
    /// </summary>
    /// <param name="accommodationRepository">Repository for data access</param>
    /// <param name="accommodationMapper">Mapper for entity-to-DTO transformation</param>
    public AccommodationService(IAccommodationRepository accommodationRepository, AccommodationMapper accommodationMapper)
    {
        _accommodationRepository = accommodationRepository;
        _accommodationMapper = accommodationMapper;
    }

    /// <summary>
    /// Retrieves all accommodations and maps them to DTOs.
    /// </summary>
    /// <returns>List of accommodation DTOs</returns>
    public async Task<List<AccommodationDto>> GetAllAccommodations()
    {
        var accommodations = await _accommodationRepository.GetAllAccommodations();

        // Maps each accommodation entity to its corresponding DTO
        return accommodations
            .Select(a => _accommodationMapper.MapEntityToDto(a))
            .ToList();
    }
}
