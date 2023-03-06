using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace telsor.Migrations
{
    /// <inheritdoc />
    public partial class extendDeps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DepNumber",
                table: "Departments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepNumber",
                table: "Departments");
        }
    }
}
