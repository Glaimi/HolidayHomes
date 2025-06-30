using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateDatabaseStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KitchenTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitchenTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LandLords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    LastName = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LandLords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SanitaryTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanitaryTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Seasons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    StartsAt = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    EndsAt = table.Column<DateOnly>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seasons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccommodationTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    KitchenTypeId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccommodationTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccommodationTypes_KitchenTypes_KitchenTypeId",
                        column: x => x.KitchenTypeId,
                        principalTable: "KitchenTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Accommodations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    Hints = table.Column<string>(type: "TEXT", nullable: true),
                    SquareMeter = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfBedrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfBeds = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfMixedRooms = table.Column<int>(type: "INTEGER", nullable: false),
                    NumberOfLivingRooms = table.Column<int>(type: "INTEGER", nullable: false),
                    IsDogAllowed = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsWifiAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsNonSmoking = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsTelevisionAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsWashingMachineAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsParkingAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsSaunaAvailable = table.Column<bool>(type: "INTEGER", nullable: false),
                    BedSheetsAvailability = table.Column<int>(type: "INTEGER", nullable: false),
                    ShortTripAvailability = table.Column<int>(type: "INTEGER", nullable: false),
                    TowelsAvailability = table.Column<int>(type: "INTEGER", nullable: false),
                    AccommodationTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    KitchenTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accommodations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accommodations_AccommodationTypes_AccommodationTypeId",
                        column: x => x.AccommodationTypeId,
                        principalTable: "AccommodationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accommodations_KitchenTypes_KitchenTypeId",
                        column: x => x.KitchenTypeId,
                        principalTable: "KitchenTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccommodationLandLord",
                columns: table => new
                {
                    AccommodationsId = table.Column<int>(type: "INTEGER", nullable: false),
                    LandLordsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccommodationLandLord", x => new { x.AccommodationsId, x.LandLordsId });
                    table.ForeignKey(
                        name: "FK_AccommodationLandLord_Accommodations_AccommodationsId",
                        column: x => x.AccommodationsId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccommodationLandLord_LandLords_LandLordsId",
                        column: x => x.LandLordsId,
                        principalTable: "LandLords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AccommodationSanitaryInfos",
                columns: table => new
                {
                    AccomodationId = table.Column<int>(type: "INTEGER", nullable: false),
                    SanitaryTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    AccommodationId = table.Column<int>(type: "INTEGER", nullable: false),
                    Amount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccommodationSanitaryInfos", x => new { x.AccomodationId, x.SanitaryTypeId });
                    table.ForeignKey(
                        name: "FK_AccommodationSanitaryInfos_Accommodations_AccommodationId",
                        column: x => x.AccommodationId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccommodationSanitaryInfos_SanitaryTypes_SanitaryTypeId",
                        column: x => x.SanitaryTypeId,
                        principalTable: "SanitaryTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Street = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    AccomodationId = table.Column<int>(type: "INTEGER", nullable: false),
                    AccommodationId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Accommodations_AccommodationId",
                        column: x => x.AccommodationId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FilePath = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    AltText = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    AccommodationId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Accommodations_AccommodationId",
                        column: x => x.AccommodationId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SeasonPricings",
                columns: table => new
                {
                    SeasonId = table.Column<int>(type: "INTEGER", nullable: false),
                    AccomodationId = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    IsBookable = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccommodationId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeasonPricings", x => new { x.AccomodationId, x.SeasonId });
                    table.ForeignKey(
                        name: "FK_SeasonPricings_Accommodations_AccommodationId",
                        column: x => x.AccommodationId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SeasonPricings_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationLandLord_LandLordsId",
                table: "AccommodationLandLord",
                column: "LandLordsId");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_AccommodationTypeId",
                table: "Accommodations",
                column: "AccommodationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_KitchenTypeId",
                table: "Accommodations",
                column: "KitchenTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_Name",
                table: "Accommodations",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationSanitaryInfos_AccommodationId",
                table: "AccommodationSanitaryInfos",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationSanitaryInfos_SanitaryTypeId",
                table: "AccommodationSanitaryInfos",
                column: "SanitaryTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationTypes_KitchenTypeId",
                table: "AccommodationTypes",
                column: "KitchenTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationTypes_Title",
                table: "AccommodationTypes",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_AccommodationId",
                table: "Addresses",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_Street_City",
                table: "Addresses",
                columns: new[] { "Street", "City" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_AccommodationId",
                table: "Images",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_FilePath",
                table: "Images",
                column: "FilePath",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KitchenTypes_Title",
                table: "KitchenTypes",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SanitaryTypes_Title",
                table: "SanitaryTypes",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SeasonPricings_AccommodationId",
                table: "SeasonPricings",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_SeasonPricings_SeasonId",
                table: "SeasonPricings",
                column: "SeasonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccommodationLandLord");

            migrationBuilder.DropTable(
                name: "AccommodationSanitaryInfos");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "SeasonPricings");

            migrationBuilder.DropTable(
                name: "LandLords");

            migrationBuilder.DropTable(
                name: "SanitaryTypes");

            migrationBuilder.DropTable(
                name: "Accommodations");

            migrationBuilder.DropTable(
                name: "Seasons");

            migrationBuilder.DropTable(
                name: "AccommodationTypes");

            migrationBuilder.DropTable(
                name: "KitchenTypes");
        }
    }
}
