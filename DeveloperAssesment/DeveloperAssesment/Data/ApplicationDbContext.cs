using DeveloperAssesment.Models;
using Microsoft.EntityFrameworkCore;

namespace DeveloperAssesment.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }
    }
}
