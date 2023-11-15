using PulseConnect.Models;
using PulseConnect.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace PulseConnect.Services
{
    public static class DataBaseManagementService
    {

        public static void MigrationInitialisation(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var serviceDB = serviceScope.ServiceProvider
                    .GetService<APIDbContext>();

                serviceDB.Database.Migrate();
            }

        }
    }
}
