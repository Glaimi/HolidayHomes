using Business.Dtos;
using Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccommodationTypeController : ControllerBase
{
    private readonly AccommodationTypeService _accommodationTypeService;

    public AccommodationTypeController(AccommodationTypeService accommodationTypeService)
    {
        _accommodationTypeService = accommodationTypeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AccommodationTypeDto>>> GetAllAccommodationTypes()
    {
        var accommodationTypes = await _accommodationTypeService.GetAllAccommodationTypes();

        return Ok(accommodationTypes);
    }
}