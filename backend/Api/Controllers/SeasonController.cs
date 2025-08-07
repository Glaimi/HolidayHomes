using Business.Dtos;
using Business.Services;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeasonController : ControllerBase
{
    private readonly SeasonService _seasonService;

    public SeasonController(SeasonService seasonService)
    {
        _seasonService = seasonService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SeasonDto>>> GetAllSeasons()
    {
        List<SeasonDto> seasons = await _seasonService.GetAllSeasons();

        return Ok(seasons);
    }
}