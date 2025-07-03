using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAbbreviationToAccommodationTypeAndKitchenTypeAndUseModelBuilderInHolidayHomeDbContextForMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "KitchenTypes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "AccommodationTypes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AccommodationTypes",
                columns: new[] { "Id", "Abbreviation", "Title" },
                values: new object[,]
                {
                    { 1, "FH", "Ferienhaus" },
                    { 2, "FW", "Ferienwohnung" }
                });

            migrationBuilder.InsertData(
                table: "KitchenTypes",
                columns: new[] { "Id", "Abbreviation", "Title" },
                values: new object[,]
                {
                    { 1, "Kü", "Küche" },
                    { 2, "Kn", "Kochnische" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AccommodationTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AccommodationTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "KitchenTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "KitchenTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "KitchenTypes");

            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "AccommodationTypes");
        }
    }
}
