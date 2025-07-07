using Business.Dtos;
using Business.Mappers;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class SeasonPricingService
{
    private readonly SeasonPricingRepository _seasonPricingRepository;
    private readonly SeasonPricingMapper _seasonPricingMapper;

    public SeasonPricingService(SeasonPricingRepository seasonPricingRepository, SeasonPricingMapper seasonPricingMapper)
    {
        _seasonPricingRepository = seasonPricingRepository;
        _seasonPricingMapper = seasonPricingMapper;
    }

    public async Task<List<SeasonPricingDto>> GetSeasonPricingsByAccommodationIdAsync(int accommodationId)
    {
        List<SeasonPricing> seasonPricings =
            await _seasonPricingRepository.GetSeasonPricingsByAccommodationIdAsync(accommodationId);

        List<SeasonPricingDto> seasonPricingDtos = [];

        foreach (SeasonPricing seasonPricing in seasonPricings)
        {
            SeasonPricingDto seasonPricingDto = _seasonPricingMapper.MapEntityToDto(seasonPricing);
            seasonPricingDtos.Add(seasonPricingDto);
        }

        return seasonPricingDtos;
    }

    public async Task<double> GetCurrentPriceByAccommodationIdAsync(int accommodationId, DateTime dateTime)
    {
        // Get all pricings for the accommodation.
        List<SeasonPricing> seasonPricings =
            await _seasonPricingRepository.GetSeasonPricingsByAccommodationIdAsync(accommodationId);

        if (seasonPricings.Count < 1)
        {
            // Accommodation with the given ID was not found.
            return 0.0;
        }

        // Find the current pricing for the accommodation.
        SeasonPricing? currentSeasonPricing = seasonPricings.Find(sp =>
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, sp.Season.StartMonth, sp.Season.StartDay);
            DateTime endDate = new DateTime(DateTime.Now.Year, sp.Season.EndMonth, sp.Season.EndDay);

            return dateTime >= startDate && dateTime <= endDate;
        });

        if (currentSeasonPricing is null)
        {
            // Current season could not be determined.
            return 0.0;
        }

        return currentSeasonPricing.Price;
    }
}