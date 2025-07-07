using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAbbreviationToSanitaryTypeAndAddSeedingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Abbreviation",
                table: "SanitaryTypes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.InsertData(
                table: "SanitaryTypes",
                columns: new[] { "Id", "Abbreviation", "Title" },
                values: new object[,]
                {
                    { 1, "D", "Dusche / WC" },
                    { 2, "B", "Bad / WC" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SanitaryTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SanitaryTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "Abbreviation",
                table: "SanitaryTypes");
        }
    }
}
