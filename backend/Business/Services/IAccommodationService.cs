using Business.Dtos;

namespace Business.Services;

public interface IAccommodationService
{
    Task<List<AccommodationDto>> GetAllAccommodations();

}