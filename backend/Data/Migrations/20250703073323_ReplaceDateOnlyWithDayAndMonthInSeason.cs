using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceDateOnlyWithDayAndMonthInSeason : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SeasonPricings_AccommodationId",
                table: "SeasonPricings");

            migrationBuilder.DropIndex(
                name: "IX_AccommodationSanitaryInfos_AccommodationId",
                table: "AccommodationSanitaryInfos");

            migrationBuilder.DropColumn(
                name: "EndsAt",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "StartsAt",
                table: "Seasons");

            migrationBuilder.AddColumn<int>(
                name: "EndDay",
                table: "Seasons",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EndMonth",
                table: "Seasons",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartDay",
                table: "Seasons",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartMonth",
                table: "Seasons",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "LandLordName",
                table: "Accommodations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDay",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "EndMonth",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "StartDay",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "StartMonth",
                table: "Seasons");

            migrationBuilder.AddColumn<DateOnly>(
                name: "EndsAt",
                table: "Seasons",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "StartsAt",
                table: "Seasons",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AlterColumn<string>(
                name: "LandLordName",
                table: "Accommodations",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SeasonPricings_AccommodationId",
                table: "SeasonPricings",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationSanitaryInfos_AccommodationId",
                table: "AccommodationSanitaryInfos",
                column: "AccommodationId");
        }
    }
}
