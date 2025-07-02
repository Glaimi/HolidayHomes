using Business.Services;
using ClosedXML.Excel;
using Data.Enums;
using Data.Models;

namespace Business.Tools;

public class ExcelWorksheetParser
{
    private readonly AccommodationTypeService _accommodationTypeService;
    private readonly KitchenTypeService _kitchenTypeService;

    // Predefined constants using to access the worksheet data.
    private readonly string _worksheetName = "Stammdaten";
    private readonly int _headerHeight = 14;

    public ExcelWorksheetParser(AccommodationTypeService accommodationTypeService,
        KitchenTypeService kitchenTypeService)
    {
        _accommodationTypeService = accommodationTypeService;
        _kitchenTypeService = kitchenTypeService;
    }

    public async Task<List<Accommodation>> ToAccommodationsList(IXLWorksheet worksheet)
    {
        // Determine the number of the last row that has data.
        int lastColumnNumber = worksheet.LastRowUsed()?.RowNumber() ?? _headerHeight + 1;

        // Get the rows after the header that have data.
        IXLRow[] rows = worksheet.Rows(_headerHeight + 1, lastColumnNumber).ToArray();

        List<Accommodation> accommodations = [];

        for (int i = 0; i < rows.Length; i++)
        {
            string accommodationTypeValue = GetStringFromCell(rows, i, "A");
            string kitchenTypeValue = GetStringFromCell(rows, i, "K");

            var accommodation = new Accommodation
            {
                Name = GetStringFromCell(rows, i, "V"),
                Hints = GetStringFromCell(rows, i, "C"),
                LandLordName = GetStringFromCell(rows, i, "A"),
                SquareMeter = GetIntFromCell(rows, i, "G"),
                NumberOfBedrooms = GetIntFromCell(rows, i, "H"),
                NumberOfBeds = GetIntFromCell(rows, i, "F"),
                NumberOfMixedRooms = GetIntFromCell(rows, i, "J"),
                NumberOfLivingRooms = GetIntFromCell(rows, i, "I"),
                IsDogAllowed = GetBoolFromCell(rows, i, "X"),
                IsWifiAvailable = GetBoolFromCell(rows, i, "W"),
                IsNonSmoking = GetBoolFromCell(rows, i, "Y"),
                IsTelevisionAvailable = GetBoolFromCell(rows, i, "Z"),
                IsWashingMachineAvailable = GetBoolFromCell(rows, i, "AA"),
                IsParkingAvailable = GetBoolFromCell(rows, i, "AB"),
                IsSaunaAvailable = GetBoolFromCell(rows, i, "AC"),
                BedSheetsAvailability = GetAvailabilityFromCell(rows, i, "T"),
                ShortTripAvailability = GetAvailabilityFromCell(rows, i, "S"),
                TowelsAvailability = GetAvailabilityFromCell(rows, i, "U"),
                AccommodationType = await _accommodationTypeService
                    .GetAccommodationTypeByTitleOrDefaultAsync(accommodationTypeValue),
                KitchenType = await _kitchenTypeService.GetKitchenTypeByTitleOrDefaultAsync(kitchenTypeValue)
            };

            accommodations.Add(accommodation);
        }

        return accommodations;
    }

    private string GetStringFromCell(IXLRow[] rows, int rowNumber, string columnLetter)
    {
        return rows[rowNumber].Cell(columnLetter).Value.ToString();
    }

    private int GetIntFromCell(IXLRow[] rows, int rowNumber, string columnLetter)
    {
        if (int.TryParse(GetStringFromCell(rows, rowNumber, columnLetter), out int number))
        {
            return number;
        }

        throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält keine Ganzzahl.");
    }

    private decimal GetDecimalFromCell(IXLRow[] rows, int rowNumber, string columnLetter)
    {
        if (decimal.TryParse(GetStringFromCell(rows, rowNumber, columnLetter), out decimal number))
        {
            return number;
        }

        throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält keine Dezimalzahl.");
    }

    private bool GetBoolFromCell(IXLRow[] rows, int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rows, rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" => true,
            "nein" or "" => false,
            _ => throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält ungültige Daten.")
        };
    }

    private Availability GetAvailabilityFromCell(IXLRow[] rows, int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rows, rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" or "vorhanden" => Availability.Available,
            "nicht vorhanden" or "" => Availability.Unavailable,
            "gegen aufpreis" => Availability.ExtraCharge,
            _ => throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält ungültige Daten.")
        };
    }
}