using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseConnect.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableConnections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    id_connection = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    id_user_1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_user_2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    connection_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    connection_status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.id_connection);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");
        }
    }
}
