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
            
            CreateMap<Customer, ConsumerDto>().ReverseMap();
        }
    }
}