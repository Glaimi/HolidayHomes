using Data.Models;

namespace Data.Repositories;


/// <summary>
/// A mock implementation of the <see cref="IAccommodationRepository"/> interface.
/// Used for testing purposes without accessing a real database.
/// </summary>
public class AccommodationMockRepository : IAccommodationRepository
{
    private readonly List<Accommodation> _mockAccommodations;

    public async Task<Accommodation> SaveAccommodationAsync(Accommodation accommodation)
    {
        return accommodation;
    }

    /// <summary>
    /// Initializes the repository with a predefined list of mock accommodations.
    /// </summary>
    public AccommodationMockRepository()
    {
        _mockAccommodations = new List<Accommodation>
        {
            new Accommodation
            {
                Id = 1,
                Name = "Ferienwohnung Küstenblick",
                Address = new Address()
                {


                    City = "Bremen",
                    Street = "Dorfstraße 3",


                },
                NumberOfBedrooms = 4,
                IsDogAllowed = true
            },
            new Accommodation
            {
                Id = 2,
                Name = "City Loft",
                Address = new Address()
                {

                    City = "Hamburg",
                    Street = "Hafenkante 3",

                },
                NumberOfBedrooms = 2,
                IsDogAllowed = false
            },
            new Accommodation
            {
                Id = 3,
                Name = "Berghütte Alpenblick",
                Address = new Address()
                {

                    City = "Berlin",
                    Street = "Oranienstraße 5",


                },
                NumberOfBedrooms = 6,
                IsDogAllowed = true
            }
        };
    }

    /// <summary>
    /// Retrieves all predefined mock accommodations.
    /// </summary>
    /// <returns>
    /// A task containing an enumerable collection of <see cref="Accommodation"/> objects.
    /// </returns>
    public async Task<IEnumerable<Accommodation>> GetAllAccommodationsAsync()
    {
        return await Task.FromResult(_mockAccommodations.AsEnumerable());
    }

    public async Task<int> GetAccommodationsCountAsync()
    {
        return _mockAccommodations.Count;
    }

    public async Task<Accommodation?> GetAccommodationByNameAsync(string name)
    {
        var accommodation = _mockAccommodations.FirstOrDefault(a => a.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        return await Task.FromResult(accommodation);
    }
}