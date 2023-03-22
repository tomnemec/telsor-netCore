using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace telsor.Migrations
{
    /// <inheritdoc />
    public partial class PopulateRoleswithdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Roles ( Name) VALUES ('Admin')");
            migrationBuilder.Sql("INSERT INTO Roles ( Name) VALUES ('Clerk')");
            migrationBuilder.Sql("INSERT INTO Roles ( Name) VALUES ('User')");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
