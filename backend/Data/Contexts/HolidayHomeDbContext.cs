using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts;

public class HolidayHomeDbContext : DbContext
{
    public DbSet<Accommodation> Accommodations { get; set; }
    public DbSet<AccommodationSanitaryInfo> AccommodationSanitaryInfos { get; set; }
    public DbSet<AccommodationType> AccommodationTypes { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<KitchenType> KitchenTypes { get; set; }
    public DbSet<SanitaryType> SanitaryTypes { get; set; }
    public DbSet<Season> Seasons { get; set; }
    public DbSet<SeasonPricing> SeasonPricings { get; set; }

    public HolidayHomeDbContext(DbContextOptions<HolidayHomeDbContext> options) : base(options) { }

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<AccommodationSanitaryInfo>().HasKey(asi => new { AccomodationId = asi.AccommodationId, asi.SanitaryTypeId });
        modelBuilder.Entity<SeasonPricing>().HasKey(sp => new { AccomodationId = sp.AccommodationId, sp.SeasonId });
        modelBuilder.Entity<Accommodation>().HasIndex(a => new { a.Name }).IsUnique();
        modelBuilder.Entity<AccommodationType>().HasIndex(at => new { at.Title }).IsUnique();
        modelBuilder.Entity<Address>().HasIndex(a => new { a.Street, a.City }).IsUnique();
        modelBuilder.Entity<Image>().HasIndex(i => new { i.FilePath }).IsUnique();
        modelBuilder.Entity<KitchenType>().HasIndex(kt => new { kt.Title }).IsUnique();
        modelBuilder.Entity<SanitaryType>().HasIndex(st => new { st.Title }).IsUnique();
    }
}