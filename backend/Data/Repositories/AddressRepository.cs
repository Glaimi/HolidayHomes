using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class AddressRepository
{
    private HolidayHomeDbContext _dataContext;

    public AddressRepository(HolidayHomeDbContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Address> SaveAddressAsync(Address address)
    {
        _dataContext.Addresses.Add(address);
        await _dataContext.SaveChangesAsync();

        return address;
    }

    public async Task<List<Address>> GetAllAddressesAsync()
    {
        return await _dataContext.Addresses.ToListAsync();
    }

    public async Task<Address?> GetAddressByStreetAndCityAsync(string street, string city)
    {
        return await _dataContext.Addresses.FirstOrDefaultAsync(a =>
            a.Street.ToLower().Equals(street.ToLower()) && a.City.ToLower().Equals(city.ToLower())
        );
    }
}