using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using telsor.Models;

namespace telsor.Controllers.Resources
{
    public class UserResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public int Department { get; set; }
    }
}