using Microsoft.EntityFrameworkCore;

namespace Data.Contexts;

public class HolidayHomeDbContext : DbContext
{
    public HolidayHomeDbContext(DbContextOptions<HolidayHomeDbContext> options): base(options) {}
}