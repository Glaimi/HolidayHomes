using System.Globalization;
using Business.Services;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonPricingController : ControllerBase
    {
        private readonly SeasonPricingService _seasonPricingService;


        public SeasonPricingController(SeasonPricingService seasonPricingService)
        {
            _seasonPricingService = seasonPricingService;
        }
        // Gibt alle SeasonPricings für eine Unterkunft zurück.
      
        [HttpGet("{accommodationId}")]
        public async Task<ActionResult> GetSeasonPricing(int accommodationId)
        {
            var pricingCalculate = await _seasonPricingService.GetSeasonPricingsByAccommodationIdAsync(accommodationId);
            return Ok(pricingCalculate);
        }
        // Gibt den aktuellen Preis für eine Unterkunft an einem bestimmten Datum zurück.
        [HttpGet("{accommodationId}/current")]
        public async Task<ActionResult> GetCurrentPrice(int accommodationId, [FromQuery] string date)
        {
            
            if (!DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var dateTime))
            {
                return BadRequest("Ungültiges Datumsformat. Bitte yyyy-MM-ddd verwenden.");
            }
            var price = await _seasonPricingService.GetCurrentPriceByAccommodationIdAsync(accommodationId, dateTime);
            return Ok(price);
        }
    }
}
