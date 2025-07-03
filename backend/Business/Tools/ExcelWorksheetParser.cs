using Business.Services;
using ClosedXML.Excel;
using Data.Enums;
using Data.Models;

namespace Business.Tools;

public class ExcelWorksheetParser
{
    private readonly AddressService _addressService;
    private readonly AccommodationTypeService _accommodationTypeService;
    private readonly KitchenTypeService _kitchenTypeService;

    // Predefined constants using to access the worksheet data.
    private readonly string _worksheetName = "Stammdaten";
    private readonly int _headerHeight = 14;
    private IXLWorksheet? _worksheet;

    public ExcelWorksheetParser(AddressService addressService, AccommodationTypeService accommodationTypeService,
        KitchenTypeService kitchenTypeService)
    {
        _addressService = addressService;
        _accommodationTypeService = accommodationTypeService;
        _kitchenTypeService = kitchenTypeService;
    }

    public async Task<List<Accommodation>> ToAccommodationsList(string filePath)
    {
        XLWorkbook workbook = new XLWorkbook(filePath);

        if (workbook.TryGetWorksheet(_worksheetName, out _worksheet))
        {
            // Determine where to start reading.
            int firstRowNumber = _headerHeight + 1;

            // Determine where to stop reading.
            int lastRowNumber = _worksheet.LastRowUsed()?.RowNumber() ?? 0;

            List<Accommodation> accommodations = [];

            // Iterate through the rows.
            for (int rowNumber = firstRowNumber; rowNumber <= lastRowNumber; rowNumber++)
            {
                AccommodationType? accommodationType =
                    await _accommodationTypeService.GetAccommodationTypeByAbbreviationAsync(
                        GetStringFromCell(rowNumber, "A"));

                if (accommodationType == null)
                {
                    throw new FileFormatException($"Row {rowNumber} contains an unknown accommodation type.");
                }

                KitchenType? kitchenType =
                    await _kitchenTypeService.GetKitchenTypeByAbbreviationAsync(GetStringFromCell(rowNumber, "K"));

                if (kitchenType == null)
                {
                    throw new FileFormatException($"Row {rowNumber} contains an unknown kitchen type.");
                }

                Address address = await _addressService.GetAddressByStreetAndCityAsync(
                    GetStringFromCell(rowNumber, "D"),
                    GetStringFromCell(rowNumber, "E")
                );

                Accommodation accommodation = new Accommodation()
                {
                    LandLordName = GetStringFromCell(rowNumber, "B"),
                    Name = GetStringFromCell(rowNumber, "C"),
                    Address = address,
                    NumberOfBeds = GetIntFromCell(rowNumber, "F"),
                    SquareMeter = GetIntFromCell(rowNumber, "G"),
                    NumberOfBedrooms = GetIntFromCell(rowNumber, "H"),
                    NumberOfLivingRooms = GetIntFromCell(rowNumber, "I"),
                    NumberOfMixedRooms = GetIntFromCell(rowNumber, "J"),
                    ShortTripAvailability = GetAvailabilityFromCell(rowNumber, "S"),
                    BedSheetsAvailability = GetAvailabilityFromCell(rowNumber, "T"),
                    TowelsAvailability = GetAvailabilityFromCell(rowNumber, "U"),
                    Hints = GetStringFromCell(rowNumber, "V"),
                    IsWifiAvailable = GetBoolFromCell(rowNumber, "W"),
                    IsDogAllowed = GetBoolFromCell(rowNumber, "X"),
                    IsNonSmoking = GetBoolFromCell(rowNumber, "Y"),
                    IsTelevisionAvailable = GetBoolFromCell(rowNumber, "Z"),
                    IsWashingMachineAvailable = GetBoolFromCell(rowNumber, "AA"),
                    IsParkingAvailable = GetBoolFromCell(rowNumber, "AB"),
                    IsSaunaAvailable = GetBoolFromCell(rowNumber, "AC"),
                    KitchenType = kitchenType,
                    AccommodationType = accommodationType
                };

                accommodations.Add(accommodation);
            }

            return accommodations;
        }

        throw new FileFormatException($"The initial data file doesn't contain the sheet {_worksheetName}!");
    }

    private string GetStringFromCell(int rowNumber, string columnLetter)
    {
        return _worksheet!.Row(rowNumber).Cell(columnLetter).Value.ToString();
    }

    private int GetIntFromCell(int rowNumber, string columnLetter)
    {
        if (int.TryParse(GetStringFromCell(rowNumber, columnLetter), out int number))
        {
            return number;
        }

        throw new FormatException($"Row {rowNumber}, column {columnLetter} doesn't contain an integer.");
    }

    private decimal GetDecimalFromCell(int rowNumber, string columnLetter)
    {
        if (decimal.TryParse(GetStringFromCell(rowNumber, columnLetter), out decimal number))
        {
            return number;
        }

        throw new FormatException($"Row {rowNumber}, column {columnLetter} doesn't contain a floating point number.");
    }

    private bool GetBoolFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" => true,
            "nein" or "" => false,
            _ => throw new FormatException($"Row {rowNumber}, column {columnLetter} contains invalid data.")
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
            _ => throw new FormatException($"Row {rowNumber}, column {columnLetter} contains invalid data.")
        };
    }
}