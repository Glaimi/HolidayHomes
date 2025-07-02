using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationshipBetweenAccommodationAndAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Accommodations_AccommodationId",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_AccommodationId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "AccommodationId",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "AccomodationId",
                table: "Addresses");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Accommodations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_AddressId",
                table: "Accommodations",
                column: "AddressId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Accommodations_Addresses_AddressId",
                table: "Accommodations",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accommodations_Addresses_AddressId",
                table: "Accommodations");

            migrationBuilder.DropIndex(
                name: "IX_Accommodations_AddressId",
                table: "Accommodations");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Accommodations");

            migrationBuilder.AddColumn<int>(
                name: "AccommodationId",
                table: "Addresses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AccomodationId",
                table: "Addresses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_AccommodationId",
                table: "Addresses",
                column: "AccommodationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Accommodations_AccommodationId",
                table: "Addresses",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
