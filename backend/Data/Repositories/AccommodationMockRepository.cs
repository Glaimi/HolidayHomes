using Data.Models;

namespace Data.Repositories;

public class AccommodationMockRepository : IAccommodationRepository
{
    private readonly List<Accommodation> _mockAccommodations;

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

    public async Task<IEnumerable<Accommodation>> GetAllAccommodations()
    {
        return await Task.FromResult(_mockAccommodations.AsEnumerable());
    }
}