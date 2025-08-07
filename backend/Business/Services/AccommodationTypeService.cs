using Business.Dtos;
using Business.Mappers;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class AccommodationTypeService
{
    private readonly AccommodationTypeRepository _accommodationTypeRepository;
    private readonly AccommodationTypeMapper _accommodationTypeMapper;

    public AccommodationTypeService(AccommodationTypeRepository accommodationTypeRepository,
        AccommodationTypeMapper accommodationTypeMapper)
    {
        _accommodationTypeRepository = accommodationTypeRepository;
        _accommodationTypeMapper = accommodationTypeMapper;
    }

    public async Task<AccommodationTypeDto?> GetAccommodationTypeByIdAsync(int accommodationTypeId)
    {
        AccommodationType? accommodationType =
            await _accommodationTypeRepository.GetAccommodationTypeByIdAsync(accommodationTypeId);

        if (accommodationType is null)
        {
            return null;
        }

        return _accommodationTypeMapper.MapEntityToDto(accommodationType);
    }

    public async Task<List<AccommodationTypeDto>> GetAllAccommodationTypesAsync()
    {
        List<AccommodationType> accommodationTypes = await _accommodationTypeRepository.GetAllAccommodationTypes();
        List<AccommodationTypeDto> dtos = [];

        foreach (AccommodationType accommodationType in accommodationTypes)
        {
            dtos.Add(_accommodationTypeMapper.MapEntityToDto(accommodationType));
        }

        return dtos;
    }

    public async Task<AccommodationType?> GetAccommodationTypeByAbbreviationAsync(string abbreviation)
    {
        return await _accommodationTypeRepository.GetAccommodationTypeByAbbreviationAsync(abbreviation);
    }
}