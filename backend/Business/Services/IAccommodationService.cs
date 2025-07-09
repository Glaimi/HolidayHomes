using Business.Dtos;

namespace Business.Services;

public interface IAccommodationService
{
    Task<List<AccommodationDto>> GetAllAccommodationsAsync();
    Task<string?> GetAccommodationNameByIdAsync(int id);
    Task<AccommodationDto> SaveAccommodationAsync(AddAccommodationDto dto);
}