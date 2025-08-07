using Business.Services;
using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class KitchenTypeController : ControllerBase
{
    private readonly KitchenTypeService _kitchenTypeService;

    public KitchenTypeController(KitchenTypeService kitchenTypeService)
    {
        _kitchenTypeService = kitchenTypeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<KitchenType>>> GetAllKitchenTypes()
    {
        var kitchenTypes = await _kitchenTypeService.GetAllKitchenTypes();

        return Ok(kitchenTypes);
    }
}