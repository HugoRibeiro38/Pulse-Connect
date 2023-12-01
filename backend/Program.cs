using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Services;
using PulseConnect.Settings;
using PulseConnect.Middleware;
using System.Security.Cryptography;
using JsonApiDotNetCore.Configuration;
using Microsoft.AspNetCore.Builder;
using System;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;


// Use 'connectionString' to establish your database connection
var SQLConfig = configuration.GetSection("SQLServer");
var SQLConnectionString = SQLConfig["ConnectionString"];
builder.Services.AddDbContext<APIDbContext>(options =>
options.UseSqlServer(SQLConnectionString));

// Configurar a conex�o com o MongoDB
var mongoDbConfig = configuration.GetSection("MongoDB");
var mongoDbConnectionString = mongoDbConfig["ConnectionString"];
var mongoDbDatabaseName = mongoDbConfig["DatabaseName"];

// Adicione a configura��o do MongoDB ao servi�o
builder.Services.Configure<MongoDbSettings>(settings =>
{
    settings.ConnectionString = mongoDbConnectionString;
    settings.DatabaseName = mongoDbDatabaseName;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JsonApiDotNetCore
builder.Services.AddJsonApi<APIDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
DataBaseManagementService.MigrationInitialisation(app);

app.UseHttpsRedirection();

// Uso Middleware Desenvolvido
app.UseMiddleware<AuthenticationMiddleware>();

//Uso de Autenticação
app.UseAuthentication();

//Uso de autorização
app.UseAuthorization();

app.UseAuthorization();

app.MapControllers();
app.UsePathBase("/api/v1");

app.Run();
