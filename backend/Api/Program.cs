using Business.Mappers;
using Business.Services;
using Business.Tools;
using Data.Contexts;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Configure app to use Sqlite.
string? dbName = builder.Configuration.GetConnectionString("SqliteDatabaseConnectionString");
var folder = Environment.SpecialFolder.LocalApplicationData;
var path = Environment.GetFolderPath(folder);
var dbPath = Path.Combine(path, dbName);
var connectionString = $"Data Source={dbPath}";

// Configure the DbContext.
builder.Services.AddDbContext<HolidayHomeDbContext>(optionsBuilder =>
{
    optionsBuilder
        .UseSqlite(connectionString)
        .LogTo(Console.WriteLine, LogLevel.Information);

    if (!builder.Environment.IsProduction())
    {
        optionsBuilder
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors();
    }
});

// Add services to the container.
builder.Services.AddScoped<ImageService>();
builder.Services.AddScoped<ImageRepository>();
builder.Services.AddScoped<AccommodationRepository>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IAccommodationService, AccommodationService>();
builder.Services.AddScoped<IAccommodationRepository, AccommodationRepository>();
builder.Services.AddScoped<AccommodationMapper>();
builder.Services.AddScoped<AccommodationTypeRepository>();
builder.Services.AddScoped<AccommodationTypeService>();
builder.Services.AddScoped<AccommodationTypeMapper>();
builder.Services.AddScoped<KitchenTypeRepository>();
builder.Services.AddScoped<KitchenTypeService>();
builder.Services.AddScoped<AddressRepository>();
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<SanitaryTypeRepository>();
builder.Services.AddScoped<SanitaryTypeService>();
builder.Services.AddScoped<SanitaryTypeMapper>();
builder.Services.AddScoped<SeasonRepository>();
builder.Services.AddScoped<SeasonService>();
builder.Services.AddScoped<SeasonMapper>();
builder.Services.AddScoped<SeasonPricingRepository>();
builder.Services.AddScoped<SeasonPricingService>();
builder.Services.AddScoped<SeasonPricingMapper>();
builder.Services.AddTransient<DataInitializerService>();
builder.Services.AddTransient<ExcelWorksheetParser>();
// Booking-Services registration
builder.Services.AddScoped<BookingRepository>();
builder.Services.AddScoped<BookingService>();

// Configure CORS to allow connections from localhost.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(optionsBuilder =>
    {
        optionsBuilder.SetIsOriginAllowed(origin => new Uri(origin).IsLoopback)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    string? relativePath = builder.Configuration.GetValue<string>("InitialDataFilePath", "");
    string fullPath = Path.GetFullPath(relativePath);
    DataInitializerService dataInitializerService = scope.ServiceProvider.GetRequiredService<DataInitializerService>();

    await dataInitializerService.InitializeAsync(fullPath);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// UseStaticFiles is for ImageService to serve images.
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.UseCors();
app.MapControllers();
app.Run();