using Business.Tools;
using ClosedXML.Excel;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class DataInitializerService
{
    private IAccommodationRepository _accommodationRepository;
    private ExcelWorksheetParser _parser;

    public DataInitializerService(IAccommodationRepository accommodationRepository, ExcelWorksheetParser parser)
    {
        _accommodationRepository = accommodationRepository;
        _parser = parser;
    }

    public async Task InitializeAsync(string filePath)
    {
        if (await _accommodationRepository.GetAccommodationsCountAsync() > 0)
        {
            return;
        }

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