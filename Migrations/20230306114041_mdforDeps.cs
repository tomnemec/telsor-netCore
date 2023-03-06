using Microsoft.EntityFrameworkCore.Migrations;


#nullable disable

namespace telsor.Migrations
{
    /// <inheritdoc />
    public partial class mdforDeps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ('Neurčeno', 'Neurčeno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ('191000', 'Vedení Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ('191001', 'Manažer závodu Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ('191010', 'Manažer závodu Bruntál')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '192110', 'Lidské zdroje Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '192320', 'Energetika Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '192330', 'Ekologie')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '192400', 'Plánování a investic')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193100', 'Projekty')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193110', 'Logistika Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193120', 'Expedice, skladování')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193130', 'Sklad HV Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193200', 'IT')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193310', 'Zásobování Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193317', 'Zásobování Robotics')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '193320', 'Sklad materiálu Vr')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195100', 'Vedení plast výroby')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195101', 'Příprava výroby Vr')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195102', 'Údržba Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195105', 'Sklad forem')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195110', 'Mistři TP1 Plasty I')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195120', 'Mistři TP2  PlastyII')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195144', 'Regenerace')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '195147', 'Montáž Robotics')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '196000', 'Vedení stroj. výroby')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '196400', 'Konstrukce')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '196800', 'Nástrojárna')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '196801', 'Řezárna, ostřírna')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '196895', 'Mechanici - nové for')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '197012', 'Výrobní kontrola Vr')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '197013', 'Výr kontr nástroje')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '197017', 'Kontrola Robotics Vr')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '197110', 'Kvalita Vrbno')");
            migrationBuilder.Sql("INSERT INTO Departments ( DepNumber, Name) VALUES ( '198100', 'Servis opravy')");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
