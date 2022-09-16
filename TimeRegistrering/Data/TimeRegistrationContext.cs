using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeRegistrering.Models;

namespace TimeRegistrering.Data
{
    public class TimeRegistrationContext: DbContext
    {
        public TimeRegistrationContext(DbContextOptions<TimeRegistrationContext> options) : base(options)
        {
        }

        public DbSet<TimeRegistration> TimeRegistrations { get; set; }
        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.Entity<TimeRegistration>().HasOne<User>(u => u.User).WithMany(r => r.TimeRegistrations); ;
             //modelBuilder.Entity<User>().ToTable("User").HasMany(r => r.TimeRegistrations);
            //modelBuilder.Entity<TimeRegistration>().ToTable("TimeRegistrations");
        }
    }
}
