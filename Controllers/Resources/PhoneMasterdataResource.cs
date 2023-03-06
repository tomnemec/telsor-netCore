using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Controllers.Resources
{
    public class PhoneMasterdataResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public int DepartmentId { get; set; }
    }
}