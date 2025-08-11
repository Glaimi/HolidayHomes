//using Business.Dtos;
//using Business.Mappers;
//using Data.Models;
//using Data.Repositories;


namespace Business.Services
{
    public interface ISeasonPricingRepository
    {
        Task<IEnumerable<object>> GetByAccommodationIdAsync(int accommodationId);
    }
}