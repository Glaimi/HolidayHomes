using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

public class AccommodationTypeMapper
{
    public AccommodationTypeDto MapEntityToDto(AccommodationType entity)
    {
        return new AccommodationTypeDto
        {
            Id = entity.Id,
            Abbreviation = entity.Abbreviation,
            Title = entity.Title!
        };
    }
}