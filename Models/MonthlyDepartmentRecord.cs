using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Models
{
    public class MonthlyDepartmentRecord
    {
        public int Id { get; set; }
        public int NoDph { get; set; }
        public int Dph { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        
    }
}