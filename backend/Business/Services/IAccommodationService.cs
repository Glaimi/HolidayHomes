using Business.Dtos;

namespace Business.Services;

public interface IAccommodationService
{
    Task<List<AccommodationDto>> GetAllAccommodationsAsync();
    Task<AccommodationDto?> GetAccommodationByIdAsync(int id);

    Task<AccommodationDto?> GetAccommodationByNameAsync(string name);
    Task<string?> GetAccommodationNameByIdAsync(int id);
    Task<AccommodationDto> SaveAccommodationAsync(AddAccommodationDto dto);
}