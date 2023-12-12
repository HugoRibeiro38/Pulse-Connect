using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Services;
using PulseConnect.Settings;
using PulseConnect.Middleware;
using System.Security.Cryptography;
using JsonApiDotNetCore.Configuration;
using Microsoft.AspNetCore.Builder;
using System;
using Microsoft.AspNetCore.Identity;
using PulseConnect.Models;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Use 'connectionString' to establish your database connection
var SQLConfig = configuration.GetSection("SQLServer");
var SQLConnectionString = SQLConfig["ConnectionString"];
builder.Services.AddDbContext<APIDbContext>(options =>
    options.UseSqlServer(SQLConnectionString));

// Configurar a conexão com o MongoDB
var mongoDbConfig = configuration.GetSection("MongoDB");
var mongoDbConnectionString = mongoDbConfig["ConnectionString"];
var mongoDbDatabaseName = mongoDbConfig["DatabaseName"];

// Adicionar a configuração do MongoDB ao serviço
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

// Registro do ASP.NET Core Identity
builder.Services.AddIdentity<Users, IdentityRole>()
    .AddEntityFrameworkStores<APIDbContext>()
    .AddDefaultTokenProviders();

// Registro do middleware
builder.Services.AddTransient<AuthenticationMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Configurar o middleware para permitir solicitações não autenticadas para o Swagger
    app.Map("/swagger", swaggerApp =>
    {
        swaggerApp.UseSwaggerUI();
        swaggerApp.UseSwagger();
    });
}

DataBaseManagementService.MigrationInitialisation(app);

app.UseHttpsRedirection();

// Uso Middleware Desenvolvido
app.UseMiddleware<AuthenticationMiddleware>();

// Uso de Autorização e Autenticação
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UsePathBase("/api/v1");

app.Run();
