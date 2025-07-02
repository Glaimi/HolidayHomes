using Business.Tools;
using ClosedXML.Excel;

namespace Business.Services;

public class DataInitializerService
{
    private ExcelWorksheetParser _parser;

    public DataInitializerService(ExcelWorksheetParser parser)
    {
        _parser = parser;
    }

    public async Task Initialize(string filePath)
    {
        if (File.Exists(filePath))
        {
            // Load the workbook file.
            IXLWorkbook workbook = new XLWorkbook(filePath);

            // Check if the workbook file contains the required worksheet.
            if (workbook.TryGetWorksheet("Stammdaten", out var worksheet))
            {
                // TODO: Get list of Accommodations from parser.
                await _parser.ToAccommodationsList(worksheet);
            }

            throw new FileFormatException("Die Stammdatendatei enthält kein Blatt mit dem Namen 'Stammdaten'!");
        }

        throw new FileNotFoundException("Die Stammdatendatei existiert nicht!");
    }
}