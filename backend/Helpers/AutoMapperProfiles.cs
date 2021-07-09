using AutoMapper;
using backend.DTOs;
using backend.Entities;

namespace backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();

            CreateMap<Device, DeviceDto>();

            CreateMap<DeviceDto, Device>();

            CreateMap<Incident, IncidentDto>();
            CreateMap<IncidentDto, Incident>();

            CreateMap<CallDto, Call>();
            CreateMap<Call, CallDto>();

            CreateMap<Resolution, ResolutionDto>();
            CreateMap<ResolutionDto, Resolution>();
            

            CreateMap<Crew, CrewDto>().ReverseMap();
            CreateMap<CreateCrewDto, Crew>().ReverseMap();
            CreateMap<User, CrewMemberDto>().ReverseMap();

            CreateMap<Customer, ConsumerDto>().ReverseMap();
            CreateMap<CreateConsumerDto, Customer>().ReverseMap();

            CreateMap<WorkPlan, WorkPlanDto>().ReverseMap();
        }
    }
}