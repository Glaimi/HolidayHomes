using Data.Contexts;
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

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();