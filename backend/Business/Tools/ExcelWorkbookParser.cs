using ClosedXML.Excel;
using Data.Enums;
using Data.Models;

namespace Business.Tools;

public class ExcelWorkbookParser
{
    // Predefined constants using to access the worksheet data.
    private readonly string _worksheetName = "Stammdaten";
    private readonly int _headerHeight = 14;

    // Constants to be set in the constructor.
    private readonly int _lastColumnNumber;
    private readonly IXLRow[] _rows;

    public ExcelWorkbookParser(IXLWorkbook workbook)
    {
        if (workbook.TryGetWorksheet(_worksheetName, out var worksheet))
        {
            _lastColumnNumber = worksheet.LastRowUsed()?.RowNumber() ?? _headerHeight + 1;
            _rows = worksheet.Rows(_headerHeight + 1, _lastColumnNumber).ToArray();
        }
        else
        {
            throw new InvalidDataException(
                $"Die Excel-Datei enthält kein Arbeitsblatt mit dem Namen '{_worksheetName}'."
            );
        }
    }

    public List<Accommodation> ToAccommodationsList()
    {
        List<Accommodation> accommodations = [];

        for (int i = 0; i < _rows.Length; i++)
        {
            string accommodationTypeValue = GetStringFromCell(i, "A");
            AccommodationType? accommodationType = _accommodationTypeService.GetByTitle(accommodationTypeValue);

            if (accommodationType == null)
            {
                accommodationType = new AccommodationType() { Id = 0, Title = accommodationTypeValue };
            }

            string kitchenTypeValue = GetStringFromCell(i, "K");
            KitchenType? kitchenType = _kitchenTypeService.GetByTitle(kitchenTypeValue);

            if (kitchenType == null)
            {
                kitchenType = new KitchenType() { Id = 0, Title = kitchenTypeValue };
            }

            var accommodation = new Accommodation
            {
                Name = GetStringFromCell(i, "V"),
                Hints = GetStringFromCell(i, "C"),
                LandLordName = GetStringFromCell(i, "A"),
                SquareMeter = GetIntFromCell(i, "G"),
                NumberOfBedrooms = GetIntFromCell(i, "H"),
                NumberOfBeds = GetIntFromCell(i, "F"),
                NumberOfMixedRooms = GetIntFromCell(i, "J"),
                NumberOfLivingRooms = GetIntFromCell(i, "I"),
                IsDogAllowed = GetBoolFromCell(i, "X"),
                IsWifiAvailable = GetBoolFromCell(i, "W"),
                IsNonSmoking = GetBoolFromCell(i, "Y"),
                IsTelevisionAvailable = GetBoolFromCell(i, "Z"),
                IsWashingMachineAvailable = GetBoolFromCell(i, "AA"),
                IsParkingAvailable = GetBoolFromCell(i, "AB"),
                IsSaunaAvailable = GetBoolFromCell(i, "AC"),
                BedSheetsAvailability = GetAvailabilityFromCell(i, "T"),
                ShortTripAvailability = GetAvailabilityFromCell(i, "S"),
                TowelsAvailability = GetAvailabilityFromCell(i, "U"),
                AccommodationType = accommodationType,
                KitchenTypeId = 0
            };

            accommodations.Add(accommodation);
        }

        return accommodations;
    }

    private string GetStringFromCell(int rowNumber, string columnLetter)
    {
        return _rows[rowNumber].Cell(columnLetter).Value.ToString();
    }

    private int GetIntFromCell(int rowNumber, string columnLetter)
    {
        if (int.TryParse(GetStringFromCell(rowNumber, columnLetter), out int number))
        {
            return number;
        }

        throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält keine Ganzzahl.");
    }

    private decimal GetDecimalFromCell(int rowNumber, string columnLetter)
    {
        if (decimal.TryParse(GetStringFromCell(rowNumber, columnLetter), out decimal number))
        {
            return number;
        }

        throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält keine Dezimalzahl.");
    }

    private bool GetBoolFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" => true,
            "nein" or "" => false,
            _ => throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält ungültige Daten.")
        };
    }

    private Availability GetAvailabilityFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" or "vorhanden" => Availability.Available,
            "nicht vorhanden" or "" => Availability.Unavailable,
            "gegen aufpreis" => Availability.ExtraCharge,
            _ => throw new FormatException($"Zeile {rowNumber}, Spalte {columnLetter} enthält ungültige Daten.")
        };
    }
}