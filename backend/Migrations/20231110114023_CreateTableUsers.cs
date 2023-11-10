using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseConnect.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BIO = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date_Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Profile_Picture_URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Last_Active = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Multi_FactorEnable = table.Column<bool>(type: "bit", nullable: false),
                    Multi_FactorCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Multi_FactorExpired = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Multi_FactorType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
