using Data.Models;

namespace Data.Repositories;

/// <summary>
/// Contract for accessing accommodation data sources (e.g., database or mock data).
/// </summary>
public interface IAccommodationRepository
{
    /// <summary>
    /// Retrieves all available accommodations from the underlying data source.
    /// </summary>
    /// <returns>
    /// A task that represents the asynchronous operation.  
    /// The task result contains a collection of <see cref="Accommodation"/> entities.
    /// </returns>
    Task<IEnumerable<Accommodation>> GetAllAccommodations();

}