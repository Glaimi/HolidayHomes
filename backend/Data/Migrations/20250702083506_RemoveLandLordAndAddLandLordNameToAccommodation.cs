using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLandLordAndAddLandLordNameToAccommodation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccommodationTypes_KitchenTypes_KitchenTypeId",
                table: "AccommodationTypes");

            migrationBuilder.DropTable(
                name: "AccommodationLandLord");

            migrationBuilder.DropTable(
                name: "LandLords");

            migrationBuilder.DropIndex(
                name: "IX_AccommodationTypes_KitchenTypeId",
                table: "AccommodationTypes");

            migrationBuilder.DropColumn(
                name: "KitchenTypeId",
                table: "AccommodationTypes");

            migrationBuilder.AddColumn<string>(
                name: "LandLordName",
                table: "Accommodations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LandLordName",
                table: "Accommodations");

            migrationBuilder.AddColumn<int>(
                name: "KitchenTypeId",
                table: "AccommodationTypes",
                type: "INTEGER",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationTypes_KitchenTypeId",
                table: "AccommodationTypes",
                column: "KitchenTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationLandLord_LandLordsId",
                table: "AccommodationLandLord",
                column: "LandLordsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccommodationTypes_KitchenTypes_KitchenTypeId",
                table: "AccommodationTypes",
                column: "KitchenTypeId",
                principalTable: "KitchenTypes",
                principalColumn: "Id");
        }
    }
}
