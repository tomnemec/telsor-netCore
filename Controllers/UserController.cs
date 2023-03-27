using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using telsor.Controllers.Persistence;
using telsor.Controllers.Resources;
using telsor.Models;

namespace telsor.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        public TelsorDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public UsersController(TelsorDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet]
        public async Task<IEnumerable<UserResource>> GetUsers()
        {
            var users = await context.Users.Include(r => r.Role).ToListAsync();
            foreach (var user in users)
                user.Password = "";

            return mapper.Map<IEnumerable<User>, IEnumerable<UserResource>>(users);
        }
        [HttpGet("{id}")]
        public async Task<UserResource> GetUser(int id)
        {
            var user = await context.Users.Include(r => r.Role).SingleOrDefaultAsync(u => u.Id == id);
            user.Password = "";
            return mapper.Map<User, UserResource>(user);
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] SaveUserResource userResource)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model is Invalid");
            var user = mapper.Map<SaveUserResource, User>(userResource);
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok(user.Id);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody] SaveUserResource userResource, int Id)
        {
            if (!ModelState.IsValid)
                return NotFound(ModelState);

            var user = await context.Users.SingleOrDefaultAsync(p => p.Id == Id);
            var resource = mapper.Map<SaveUserResource, User>(userResource);

            await context.SaveChangesAsync();

            user.Name = resource.Name;
            user.Email = resource.Email;
            user.RoleId = resource.RoleId;
            user.Password = resource.Password;
            user.Department = resource.Department;

            await context.SaveChangesAsync();

            return Ok(resource);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {

            var user = await context.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return NotFound();
            context.Remove(user);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}