using Business.Tools;
using ClosedXML.Excel;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class DataInitializerService
{
    private AccommodationRepository _accommodationRepository;
    private ExcelWorksheetParser _parser;

    public DataInitializerService(AccommodationRepository accommodationRepository, ExcelWorksheetParser parser)
    {
        _accommodationRepository = accommodationRepository;
        _parser = parser;
    }

    public async Task InitializeAsync(string filePath)
    {
        if (File.Exists(filePath))
        {
            List<Accommodation> accommodations = await _parser.ToAccommodationsList(filePath);

            foreach (Accommodation accommodation in accommodations)
            {
                await _accommodationRepository.SaveAccommodationAsync(accommodation);
            }
        }
        else
        {
            throw new FileNotFoundException("Die Stammdatendatei existiert nicht!");
        }
    }
}