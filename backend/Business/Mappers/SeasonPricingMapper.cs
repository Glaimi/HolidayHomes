using Business.Dtos;
using Data.Models;

namespace Business.Mappers;

public class SeasonPricingMapper
{
    public SeasonPricingDto MapEntityToDto(SeasonPricing entity)
    {
        return new SeasonPricingDto
        {
            SeasonTitle = entity.Season.Title!,
            StartDay = entity.Season.StartDay,
            StartMonth = entity.Season.StartMonth,
            EndDay = entity.Season.EndDay,
            EndMonth = entity.Season.EndMonth,
            Price = entity.Price
        };
    }

    public SeasonPricing MapDtoToEntity(AddSeasonPricingDto dto)
    {
        return new SeasonPricing
        {
            SeasonId = dto.SeasonId,
            IsBookable = dto.IsBookable,
            Price = dto.Price
        };
    }

    public List<SeasonPricing> MapDtosToEntities(List<AddSeasonPricingDto> dtos)
    {
        return dtos.Select(MapDtoToEntity).ToList();
    }
}