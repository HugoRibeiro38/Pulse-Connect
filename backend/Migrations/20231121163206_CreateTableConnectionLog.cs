using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PulseConnect.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableConnectionLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConnectionLog",
                columns: table => new
                {
                    id_log = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    id_connection = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    action_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectionLog", x => x.id_log);
                });

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

            migrationBuilder.CreateTable(
                name: "PasswordReset",
                columns: table => new
                {
                    id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    user_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Expire_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    currentPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NewPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfirmNewPassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordReset", x => x.id);
                    table.ForeignKey(
                        name: "FK_PasswordReset_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "IX_PasswordReset_user_id",
                table: "PasswordReset",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_User ID",
                table: "Sessions",
                column: "User ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConnectionLog");

            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "PasswordReset");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
