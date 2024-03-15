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
        public async Task<IEnumerable<FullPhoneRecord>> GetFilteredMasterData()
        {
            var numbers = await context.PhoneMasterDatas.ToListAsync();
            var withoutFixed = await context.PhoneMasterDatas
            .Where(n => n.Phone.Length != 3 &&
            //not so happy with bruntal filter as it should not appear as 3digits in list
            !n.Phone.Contains("554790") && !n.Phone.Contains("554773"))
            .ToListAsync();

            var Fixed = await context.PhoneMasterDatas.Where(n => n.Phone.Length == 3).ToListAsync();
            var sortedList = new List<FullPhoneRecord>();

            foreach (var item in withoutFixed)
            {
                var record = new FullPhoneRecord();
                record.Id = item.Id;
                record.Name = item.Name;
                record.Phone = item.Phone;
                record.DepartmentId = item.DepartmentId;
                sortedList.Add(record);
            }
            foreach (var item in Fixed)
            {
                if (sortedList.Find(i => i.Name == item.Name) == null)
                {
                    var record = new FullPhoneRecord();
                    record.Id = item.Id;
                    record.Name = item.Name;
                    record.Phone = item.Phone;
                    record.DepartmentId = item.DepartmentId;
                    sortedList.Add(record);
                }
                else
                {
                    var record = sortedList.Find(i => i.Name == item.Name);
                    record.Mobile = item.Phone;
                }
            }
            return sortedList;
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
