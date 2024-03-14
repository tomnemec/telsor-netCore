using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Controllers.Resources
{
    public class FullPhoneRecord
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public int DepartmentId { get; set; }
    }
}