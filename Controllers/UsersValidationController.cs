using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using telsor.Controllers.Persistence;
using telsor.Controllers.Resources;

namespace telsor.Controllers
{
    [Route("api/validation")]

    public class UserValidationController : Controller
    {
        public TelsorDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public UserValidationController(TelsorDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }

        [HttpPost]
        public async Task<bool> ValidateUserAsync([FromBody] Validation user)
        {

            var validatedUser = await context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
            if (validatedUser == null)
                return false;
            else
                return true;
        }
        [HttpPost("admin")]
        public async Task<bool> ValidateAdminAsynch([FromBody] Validation user)
        {

            var validatedUser = await context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
            if (validatedUser == null)
                return false;
            else if (validatedUser.IsAdmin)
                return true;
            else
                return false;
        }
    }
}