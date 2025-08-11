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

    public async Task<double> GetTotalPrice(int accommodationId, DateTime startDate, DateTime endDate)
    {
        if (endDate < startDate)
            throw new ArgumentException("Enddatum darf nicht vor dem Startdatum liegen.");

        // Preise abrufen
        List<SeasonPricing> seasonPricings =
            await _seasonPricingRepository.GetSeasonPricingsByAccommodationIdAsync(accommodationId);

        if (seasonPricings.Count < 1)
        {
            return 0.0;
        }

        double totalPrice = 0.0;

        for (DateTime date = startDate.Date; date <= endDate.Date; date = date.AddDays(1))
        {
            // Preis für das aktuelle Datum ermitteln
            SeasonPricing? currentPricing = seasonPricings.Find(sp =>
            {
                DateTime seasonStart = new DateTime(date.Year, sp.Season.StartMonth, sp.Season.StartDay);
                DateTime seasonEnd = new DateTime(date.Year, sp.Season.EndMonth, sp.Season.EndDay);

                // Berücksichtige auch Saisons, die über den Jahreswechsel gehen (z. B. 15.12. – 10.01.)
                if (seasonEnd < seasonStart)
                {
                    seasonEnd = seasonEnd.AddYears(1);
                    if (date.Month == 1) seasonStart = seasonStart.AddYears(-1);
                }

                return date >= seasonStart && date <= seasonEnd;
            });

            if (currentPricing != null)
            {
                totalPrice += currentPricing.Price;
            }
            else
            {
                // Optional: Entweder 0 berechnen oder Exception werfen
                // totalPrice += 0;
                // Oder: throw new Exception($"Keine Preisinformation für Datum {date:yyyy-MM-dd} gefunden.");
            }
        }

        return totalPrice;
    }


}