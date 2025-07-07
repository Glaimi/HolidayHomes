using System.Text.RegularExpressions;
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
    private readonly SanitaryTypeService _sanitaryTypeService;

    private IXLWorksheet? _worksheet;

    public ExcelWorksheetParser(AddressService addressService, AccommodationTypeService accommodationTypeService,
        KitchenTypeService kitchenTypeService, SanitaryTypeService sanitaryTypeService)
    {
        _addressService = addressService;
        _accommodationTypeService = accommodationTypeService;
        _kitchenTypeService = kitchenTypeService;
        _sanitaryTypeService = sanitaryTypeService;
    }

    public async Task<List<Accommodation>> ToAccommodationsList(string filePath)
    {
        const int headerHeight = 14;
        const string worksheetName = "Stammdaten";

        XLWorkbook workbook = new XLWorkbook(filePath);

        if (workbook.TryGetWorksheet(worksheetName, out _worksheet))
        {
            // Determine where to start and stop reading.
            int firstRow = headerHeight + 1;
            int lastRow = _worksheet.LastRowUsed()?.RowNumber() ?? 0;

            List<Season> seasons = GetListOfSeasons();
            List<Accommodation> accommodations = [];

            // Iterate through the rows.
            for (int row = firstRow; row <= lastRow; row++)
            {
                Address address = await _addressService.GetAddressByStreetAndCityAsync(
                    GetStringFromCell(row, "D"),
                    GetStringFromCell(row, "E")
                );

                Accommodation accommodation = new Accommodation()
                {
                    LandLordName = GetStringFromCell(row, "B"),
                    Name = GetStringFromCell(row, "C"),
                    Address = address,
                    NumberOfBeds = GetIntFromCell(row, "F"),
                    SquareMeter = GetIntFromCell(row, "G"),
                    NumberOfBedrooms = GetIntFromCell(row, "H"),
                    NumberOfLivingRooms = GetIntFromCell(row, "I"),
                    NumberOfMixedRooms = GetIntFromCell(row, "J"),
                    ShortTripAvailability = GetAvailabilityFromCell(row, "S"),
                    BedSheetsAvailability = GetAvailabilityFromCell(row, "T"),
                    TowelsAvailability = GetAvailabilityFromCell(row, "U"),
                    Hints = GetStringFromCell(row, "V"),
                    IsWifiAvailable = GetBoolFromCell(row, "W"),
                    IsDogAllowed = GetBoolFromCell(row, "X"),
                    IsNonSmoking = GetBoolFromCell(row, "Y"),
                    IsTelevisionAvailable = GetBoolFromCell(row, "Z"),
                    IsWashingMachineAvailable = GetBoolFromCell(row, "AA"),
                    IsParkingAvailable = GetBoolFromCell(row, "AB"),
                    IsSaunaAvailable = GetBoolFromCell(row, "AC"),
                    KitchenType = await GetKitchenTypeFromCell(row, "K"),
                    AccommodationType = await GetAccommodationTypeFromCell(row, "A"),
                    AccommodationSanitaryInfos = await GetSanitaryInfosFromCell(row, "L"),
                    SeasonPricings = GetSeasonPricings(seasons, row)
                };

                accommodations.Add(accommodation);
            }

            return accommodations;
        }

        throw new FileFormatException($"The initial data file doesn't contain the sheet {worksheetName}!");
    }

    private string GetStringFromCell(int rowNumber, string columnLetter)
    {
        return _worksheet!.Row(rowNumber).Cell(columnLetter).GetString().Trim();
    }

    private int GetIntFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter);

        if (int.TryParse(value, out int number))
        {
            return number;
        }

        throw new FormatException($"Row {rowNumber}, column {columnLetter} doesn't contain an integer: {value}");
    }

    private decimal GetDecimalFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter);

        if (decimal.TryParse(value, out decimal number))
        {
            return number;
        }

        throw new FormatException(
            $"Row {rowNumber}, column {columnLetter} doesn't contain a floating point number: {value}");
    }

    private bool GetBoolFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" => true,
            "nein" or "" => false,
            _ => throw new FormatException($"Row {rowNumber}, column {columnLetter} contains an invalid value: {value}")
        };
    }

    private async Task<AccommodationType> GetAccommodationTypeFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter);

        AccommodationType? accommodationType = await _accommodationTypeService
            .GetAccommodationTypeByAbbreviationAsync(value);

        if (accommodationType is null)
        {
            throw new FormatException(
                $"Row {rowNumber}, column {columnLetter} contains an invalid accommodation type: {value}");
        }

        return accommodationType;
    }

    private async Task<KitchenType> GetKitchenTypeFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter);

        KitchenType? kitchenType = await _kitchenTypeService.GetKitchenTypeByAbbreviationAsync(value);

        if (kitchenType is null)
        {
            throw new FormatException(
                $"Row {rowNumber}, column {columnLetter} contains an invalid kitchen type: {value}");
        }

        return kitchenType;
    }

    private Availability GetAvailabilityFromCell(int rowNumber, string columnLetter)
    {
        string value = GetStringFromCell(rowNumber, columnLetter).ToLower();

        return value switch
        {
            "ja" or "vorhanden" => Availability.Available,
            "nicht vorhanden" or "" => Availability.Unavailable,
            "gegen aufpreis" => Availability.ExtraCharge,
            _ => throw new FormatException($"Row {rowNumber}, column {columnLetter} contains an invalid value: {value}")
        };
    }

    private async Task<List<AccommodationSanitaryInfo>> GetSanitaryInfosFromCell(int rowNumber, string columnLetter)
    {
        string cellValue = GetStringFromCell(rowNumber, columnLetter);
        // Split the value at the forward slash, remove any whitespace and don't include empty results.
        string[] letters = cellValue.Split('/', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        // Count every letter in the array.
        Dictionary<string, int> letterCounts = GetLetterCounts(letters);

        List<AccommodationSanitaryInfo> sanitaryInfos = [];

        foreach ((string key, int value) in letterCounts)
        {
            SanitaryType? sanitaryType = await _sanitaryTypeService.GetSanitaryTypeByAbbreviationAsync(key);

            if (sanitaryType == null)
            {
                throw new FormatException($"Row {rowNumber}, column {columnLetter} contains invalid sanitary type.");
            }

            AccommodationSanitaryInfo sanitaryInfo = new AccommodationSanitaryInfo
            {
                SanitaryType = sanitaryType,
                Amount = value
            };

            sanitaryInfos.Add(sanitaryInfo);
        }

        return sanitaryInfos;
    }

    private Dictionary<string, int> GetLetterCounts(string[] letters)
    {
        Dictionary<string, int> letterCounts = [];

        foreach (string letter in letters)
        {
            string key = letter.ToUpper();

            if (letterCounts.TryGetValue(key, out int value))
            {
                // If an entry with the letter exists, increment its value.
                letterCounts[letter] = value + 1;
            }
            else
            {
                letterCounts.Add(key, 1);
            }
        }

        return letterCounts;
    }

    private List<SeasonPricing> GetSeasonPricings(List<Season> seasons, int rowNumber)
    {
        List<SeasonPricing> seasonPricings = [];

        // Maps the key of a season to the columns containing the corresponding values. For example
        // if the key is "A", the availability is stored in column M and the price in column P.
        var titleColumnsMap = new Dictionary<string, (string bookableColumn, string priceColumn)>()
        {
            { "A", ("M", "P") },
            { "B", ("N", "Q") },
            { "C", ("O", "R") }
        };

        foreach (Season season in seasons)
        {
            if (titleColumnsMap.TryGetValue(season.Title!, out var columns))
            {
                SeasonPricing seasonPricing = new SeasonPricing
                {
                    Season = season,
                    IsBookable = GetBoolFromCell(rowNumber, columns.bookableColumn),
                    Price = (double)GetDecimalFromCell(rowNumber, columns.priceColumn)
                };

                seasonPricings.Add(seasonPricing);
            }
            else
            {
                throw new FormatException($"The season title {season.Title} was not recognized!");
            }
        }

        return seasonPricings;
    }

    private List<Season> GetListOfSeasons()
    {
        // Constants to specify the range in the worksheet to read season data from.
        const string firstSeasonDataCell = "M10";
        const string lastSeasonDataCell = "O13";

        // Get the range containing season data.
        IXLRange seasonRange = _worksheet!.Range(firstSeasonDataCell, lastSeasonDataCell);
        List<Season> seasons = [];

        // Rows and columns are 1-based in a range.
        for (int col = 1; col <= seasonRange.ColumnCount(); col++)
        {
            // Grab the title of the season from the first row.
            string seasonTitle = seasonRange.Row(1).Cell(col).GetString().Trim();

            // Actual season data start in the second row.
            for (int row = 2; row <= seasonRange.RowCount(); row++)
            {
                string cellValue = seasonRange.Row(row).Cell(col).GetString().Trim();

                if (string.IsNullOrEmpty(cellValue))
                {
                    continue;
                }

                seasons.Add(CreateSeasonFromTitleAndRange(seasonTitle, cellValue));
            }
        }

        return seasons;
    }

    private Season CreateSeasonFromTitleAndRange(string seasonTitle, string dateRange)
    {
        string pattern = @"\d{2}\.\d{2}\.–\d{2}\.\d{2}\.";

        if (!Regex.IsMatch(dateRange, pattern))
        {
            throw new FormatException("Season data is formatted incorrectly!");
        }

        string[] tokens = dateRange.Split([".", "–"],
            StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

        return new Season
        {
            Title = seasonTitle,
            StartDay = int.Parse(tokens[0]),
            StartMonth = int.Parse(tokens[1]),
            EndDay = int.Parse(tokens[2]),
            EndMonth = int.Parse(tokens[3])
        };
    }
}