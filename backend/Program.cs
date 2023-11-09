using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using PulseConnect.Services;
using PulseConnect.Settings;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

/*
// Get actual values from environment variables or configuration
var mssqlDb = Environment.GetEnvironmentVariable("MSSQL_DB");
var mssqlUser = Environment.GetEnvironmentVariable("MSSQL_USER");
var mssqlPassword = Environment.GetEnvironmentVariable("MSSQL_PASSWORD");

// Replace placeholders in the connection string template with actual values
var connectionString = connectionStringTemplate
    .Replace("${MSSQL_DB}", mssqlDb)
    .Replace("${MSSQL_USER}", mssqlUser)
    .Replace("${MSSQL_PASSWORD}", mssqlPassword);
*/

// Use 'connectionString' to establish your database connection


// Use 'connectionString' to establish your database connection
var SQLConfig = configuration.GetSection("SQLServer");
var SQLConnectionString = SQLConfig["ConnectionString"];
builder.Services.AddDbContext<APIDbContext>(
    options => options.UseSqlServer(SQLConnectionString));

// Configurar a conexão com o MongoDB
var mongoDbConfig = configuration.GetSection("MongoDB");
var mongoDbConnectionString = mongoDbConfig["ConnectionString"];
var mongoDbDatabaseName = mongoDbConfig["DatabaseName"];

// Adicione a configuração do MongoDB ao serviço
builder.Services.Configure<MongoDbSettings>(settings =>
{
    settings.ConnectionString = mongoDbConnectionString;
    settings.DatabaseName = mongoDbDatabaseName;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
