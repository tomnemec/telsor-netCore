using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using telsor.Controllers.Persistence;
using telsor.Controllers.Resources;
using telsor.Models;

namespace telsor.Controllers
{
    [Route("api/departments")]
    
    public class DepartmentsController : Controller
    {
        public TelsorDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public DepartmentsController(TelsorDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet]
        public async Task<IEnumerable<DepartmentResource>> GetDepartments()
        {
            var departments = await context.Departments.ToListAsync();
            return mapper.Map<IEnumerable<Department>, IEnumerable<DepartmentResource>>(departments);
        }
        
}
}