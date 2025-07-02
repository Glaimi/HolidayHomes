using Business.Dtos;
using Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccommodationController : ControllerBase
    {
        private AccommodationService _accommodationService;

        public AccommodationController(AccommodationService accommodationService)
        {
            _accommodationService = accommodationService;
        }

        // show all Accommodations
        [HttpGet]
        public async Task<ActionResult<List<AccommodationDto>>> GetAllAccommodations()
        {
            var accommodations = await _accommodationService.GetAllAccommodations();
            return Ok(accommodations);
        }
    }
}

