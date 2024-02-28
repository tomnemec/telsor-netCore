using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using telsor.Models;

namespace telsor.Controllers.Persistence
{
    public class TelsorDbContext : DbContext
    {
        public TelsorDbContext(DbContextOptions<TelsorDbContext> options) : base(options)
        {
        }
        public DbSet<MonthlyDepartmentRecord> MontlyDepartmentRecords { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<PhoneMasterData> PhoneMasterDatas { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<PrinterMasterData> PrinterMasterDatas { get; set; }
    }
}