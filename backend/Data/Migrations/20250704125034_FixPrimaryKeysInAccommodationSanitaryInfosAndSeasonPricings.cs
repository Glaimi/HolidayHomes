using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class FixPrimaryKeysInAccommodationSanitaryInfosAndSeasonPricings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccommodationSanitaryInfos",
                table: "AccommodationSanitaryInfos"
            );

            migrationBuilder.DropColumn(
                name: "AccomodationId",
                table: "AccommodationSanitaryInfos"
            );

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccommodationSanitaryInfos",
                table: "AccommodationSanitaryInfos",
                columns: new[] { "AccommodationId", "SanitaryTypeId" }
            );

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeasonPricings",
                table: "SeasonPricings"
            );

            migrationBuilder.DropColumn(
                name: "AccomodationId",
                table: "SeasonPricings"
            );

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeasonPricings",
                table: "SeasonPricings",
                columns: new[] { "AccommodationId", "SeasonId" }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccommodationSanitaryInfos",
                table: "AccommodationSanitaryInfos"
            );

            migrationBuilder.AddColumn<int>(
                name: "AccomodationId",
                table: "AccommodationSanitaryInfos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0
            );

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccommodationSanitaryInfos",
                table: "AccommodationSanitaryInfos",
                columns: new[] { "AccomodationId", "SanitaryTypeId" }
            );

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeasonPricings",
                table: "SeasonPricings"
            );

            migrationBuilder.AddColumn<int>(
                name: "AccomodationId",
                table: "SeasonPricings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0
            );

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeasonPricings",
                table: "SeasonPricings",
                columns: new[] { "AccomodationId", "SeasonId" }
            );
        }
    }
}
