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
}