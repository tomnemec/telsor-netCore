using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using telsor.Controllers.Persistence;
using telsor.Models;

namespace telsor.Controllers
{
    [Route("api/auth")]
    public class AuthController : Controller
    {


        public TelsorDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public AuthController(TelsorDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }
        private JwtSecurityToken GetJwtSecurityToken(User user)
        {
            var claims = new[]
                {
                    new Claim("Name",user.Name),
                    new Claim("Role",user.Role.Name),
                    new Claim("Email",user.Email),
                    new Claim("Id",user.Id.ToString())
                };

            string privateKey = "testkeyvalidator-123456789";
            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(privateKey));
            var credentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken
            (
                 issuer: "ISSUER_NAME",
                 audience: "AUDIENCE",
                 claims: claims,
                signingCredentials: credentials
            );
            return token;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var existingUser = context.Users.SingleOrDefault(u => u.Email == user.Email);

            if (existingUser == null)
                return Unauthorized("Uživatel neexistuje");
            if (existingUser.Password == user.Password)
            {
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(GetJwtSecurityToken(existingUser))
                });
            }
            else
                return Unauthorized();
        }


    }

}
