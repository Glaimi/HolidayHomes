using Data.Models;

namespace Data.Repositories;

public interface IAccommodationRepository
{
    Task<IEnumerable<Accommodation>> GetAllAccommodations();

}