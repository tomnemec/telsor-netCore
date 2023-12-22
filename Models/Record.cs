using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Models
{
    public class Record
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmenId { get; set; }
        public string phoneNumber { get; set; }
        public DateTime period { get; set; }
        public int minutes { get; set; }
        public int messages { get; set; }
        public int data { get; set; }
    }
}