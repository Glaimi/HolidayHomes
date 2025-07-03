using Data.Models;

namespace Data.Repositories;

/// <summary>
/// Contract for accessing accommodation data sources (e.g., database or mock data).
/// </summary>
public interface IAccommodationRepository
{
    /// <summary>
    /// Asynchronously saves an accommodation entity to the database.
    /// </summary>
    /// <param name="accommodation">The <see cref="Accommodation"/> object to be saved.</param>
    /// <returns>
    /// A task that represents the asynchronous operation. The task result contains the saved <see cref="Accommodation"/> entity, potentially with updated properties such as the generated ID.
    /// </returns>
    Task<Accommodation> SaveAccommodationAsync(Accommodation accommodation);

    /// <summary>
    /// Retrieves all available accommodations from the underlying data source.
    /// </summary>
    /// <returns>
    /// A task that represents the asynchronous operation.  
    /// The task result contains a collection of <see cref="Accommodation"/> entities.
    /// </returns>
    Task<IEnumerable<Accommodation>> GetAllAccommodationsAsync();

    /// <summary>
    /// Asynchronously retrieves the total number of accommodations in the database.
    /// </summary>
    /// <returns>
    /// A task that represents the asynchronous operation. The task result contains the total count of accommodations.
    /// </returns>
    Task<int> GetAccommodationsCountAsync();
}