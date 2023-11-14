using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseConnect.Migrations
{
    /// <inheritdoc />
    public partial class CreateSessionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    SessionID = table.Column<string>(name: "Session ID", type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(name: "User ID", type: "nvarchar(450)", nullable: false),
                    SessionStartTime = table.Column<DateTime>(name: "Session Start Time", type: "datetime2", nullable: false),
                    SessionEndTime = table.Column<DateTime>(name: "Session End Time", type: "datetime2", nullable: true),
                    SessionToken = table.Column<string>(name: "Session Token", type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.SessionID);
                    table.ForeignKey(
                        name: "FK_Sessions_Users_User ID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_User ID",
                table: "Sessions",
                column: "User ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sessions");
        }
    }
}
