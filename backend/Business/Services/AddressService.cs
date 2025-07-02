using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class AddressService
{
    private AddressRepository _addressRepository;

    public AddressService(AddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<Address> GetAddressByStreetAndCityAsync(string street, string city)
    {
        Address? address = await _addressRepository.GetAddressByStreetAndCityAsync(street, city);

        if (address == null)
        {
            Address addressToAdd = new Address() { Street = street, City = city };
            await _addressRepository.SaveAddressAsync(addressToAdd);

            return addressToAdd;
        }

        return address;
    }
}