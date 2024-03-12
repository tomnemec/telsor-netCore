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

    [Route("api/numbers")]

    public class NumbersMdController : Controller
    {
        public TelsorDbContext context { get; }
        private readonly IMapper mapper;
        public IConfiguration _config { get; }
        public NumbersMdController(TelsorDbContext context, IMapper mapper, IConfiguration config)
        {
            this._config = config;
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet]
        public async Task<IEnumerable<PhoneMasterdataResource>> GetMasterData()
        {
            var numbers = await context.PhoneMasterDatas.ToListAsync();
            return mapper.Map<IEnumerable<PhoneMasterData>, IEnumerable<PhoneMasterdataResource>>(numbers);
        }
        [HttpGet("filtered")]
        public async Task<IEnumerable<PhoneMasterdataResource>> GetFilteredMasterData()
        {
            var numbers = await context.PhoneMasterDatas.ToListAsync();
            return mapper.Map<IEnumerable<PhoneMasterData>, IEnumerable<PhoneMasterdataResource>>(numbers);
        }
        [HttpGet("{id}")]
        public async Task<PhoneMasterdataResource> GetRecord(int id)
        {
            var number = await context.PhoneMasterDatas.SingleOrDefaultAsync(n => n.Id == id);
            return mapper.Map<PhoneMasterData, PhoneMasterdataResource>(number);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRecord([FromBody] PhoneMasterdataResource recordResource)
        {
            if (!ModelState.IsValid)
                return NotFound();

            var record = mapper.Map<PhoneMasterdataResource, PhoneMasterData>(recordResource);
            context.PhoneMasterDatas.Add(record);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord(int id)
        {
            var number = await context.PhoneMasterDatas.SingleOrDefaultAsync(n => n.Id == id);
            context.Remove(number);
            await context.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecord([FromBody] PhoneMasterdataResource recordResource)
        {
            if (!ModelState.IsValid)
                return NotFound();
            var record = await context.PhoneMasterDatas.SingleOrDefaultAsync(n => n.Id == recordResource.Id);

            record.Name = recordResource.Name;
            record.Phone = recordResource.Phone;
            record.DepartmentId = recordResource.DepartmentId;

            await context.SaveChangesAsync();

            return Ok();

        }

    }
}
