using Business.Dtos;
using Business.Mappers;
using Data.Models;
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

    public async Task<AccommodationDto> SaveAccommodationAsync(AddAccommodationDto dto)
    {
        Accommodation accommodation = await _accommodationMapper.MapDtoToEntity(dto);

        await _accommodationRepository.SaveAccommodationAsync(accommodation);

        AccommodationDto savedDto = await _accommodationMapper.MapEntityToDto(accommodation);

        return savedDto;
    }

    /// <summary>
    /// Retrieves all accommodations and maps them to DTOs.
    /// </summary>
    /// <returns>List of accommodation DTOs</returns>
    public async Task<List<AccommodationDto>> GetAllAccommodationsAsync()
    {
        var accommodations = await _accommodationRepository.GetAllAccommodationsAsync();

        // Maps each accommodation entity to its corresponding DTO
        List<AccommodationDto> accommodationDtos = [];

        foreach (var accommodation in accommodations)
        {
            var dto = await _accommodationMapper.MapEntityToDto(accommodation);
            accommodationDtos.Add(dto);
        }

        return accommodationDtos;
    }

    /// <summary>
    /// Gets the name of an accommodation by its ID.
    /// </summary>
    public async Task<string?> GetAccommodationNameByIdAsync(int accommodationId)
    {
        var accommodations = await _accommodationRepository.GetAllAccommodationsAsync();
        var accommodation = accommodations.FirstOrDefault(a => a.Id == accommodationId);
        return accommodation?.Name;
    }
}
