using PulseConnect.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
  namespace PulseConnect.Data


{
    public class APIDbContext : DbContext
    {
        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options)
        {
            
        }

        public DbSet<Users> Users { get; set; }

    }
}