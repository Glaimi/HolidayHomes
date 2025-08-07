using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

public class SeasonMapper
{
    public SeasonDto EntityToDto(Season entity)
    {
        return new SeasonDto
        {
            Id = entity.Id,
            Title = entity.Title!,
            StartDay = entity.StartDay,
            StartMonth = entity.StartMonth,
            EndDay = entity.EndDay,
            EndMonth = entity.EndMonth
        };
    }
}