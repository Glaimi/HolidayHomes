using Business.Dtos;
using Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    // Defines the route prefix for all endpoints in this controller
    [Route("api/[controller]")]

    // Indicates that this class is an API controller; enables automatic model validation, binding, etc.
    [ApiController]
    public class AccommodationController : ControllerBase
    {
        // Service used to handle business logic related to accommodations
        private readonly IAccommodationService _accommodationService;

        // Constructor with dependency injection of the accommodation service
        public AccommodationController(IAccommodationService accommodationService)
        {
            _accommodationService = accommodationService;
        }

        /// <summary>
        /// Retrieves a list of all accommodations.
        /// </summary>
        /// <returns>A list of accommodation DTOs.</returns>
        /// <response code="200">Returns the list of accommodations</response>
        

        // show all Accommodations
        [HttpGet]
        public async Task<ActionResult<List<AccommodationDto>>> GetAllAccommodations()
        {
            var accommodations = await _accommodationService.GetAllAccommodationsAsync();
            return Ok(accommodations);
        }
    }
}

