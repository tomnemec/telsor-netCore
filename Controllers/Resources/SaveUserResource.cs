using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace telsor.Controllers.Resources
{
    public class SaveUserResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public int Department { get; set; }
    }
}