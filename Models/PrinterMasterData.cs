using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Models
{
    public class PrinterMasterData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Department Department { get; set; }
        public int DepartmentId { get; set; }
        public string ResponsiblePerson { get; set; }
        public string Factory { get; set; }
        public string SerialNr { get; set; }
        public string Room { get; set; }
    }

}