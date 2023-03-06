using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using telsor.Controllers.Resources;
using telsor.Models;

namespace NuovoCRM.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            //mapping from domain to API resources
            CreateMap<Department, DepartmentResource>();
            CreateMap<PhoneMasterData, PhoneMasterdataResource>();
            
            

            //api resource to domain
            CreateMap<DepartmentResource, Department>();
            CreateMap<PhoneMasterdataResource, PhoneMasterData>();
            
        }
    }
}