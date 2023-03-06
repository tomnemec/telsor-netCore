using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Models
{
    public class PhoneMasterData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Department Department { get; set; }
        public int DepartmentId { get; set; }
    }

}