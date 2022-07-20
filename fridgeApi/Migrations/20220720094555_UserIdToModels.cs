using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fridgeApi.Migrations
{
    public partial class UserIdToModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "uniqueId",
                table: "Item",
                newName: "UniqueId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Item",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Item");

            migrationBuilder.RenameColumn(
                name: "UniqueId",
                table: "Item",
                newName: "uniqueId");
        }
    }
}
