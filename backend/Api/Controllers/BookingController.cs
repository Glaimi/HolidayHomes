using Business.Dtos;
using Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly BookingService _bookingService;

    public BookingController(BookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] BookingDto dto)
    {
        try
        {
            await _bookingService.AddAsync(dto);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _bookingService.DeleteAsync(id);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<BookingDto>>> GetBookings([FromQuery] int accommodationId)
    {
        var bookings = await _bookingService.GetBookingsByAccommodationIdAsync(accommodationId);
        return Ok(bookings);
    }
}