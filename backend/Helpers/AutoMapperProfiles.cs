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

            CreateMap<SafetyDocument, SafetyDocDto>();
            CreateMap<SafetyDocDto, SafetyDocument>();

            CreateMap<Checklist, ChecklistDto>();
            CreateMap<ChecklistDto, Checklist>();

            CreateMap<HistoryOfSafetyDocumentStateChange, HistorySafetyDocDto>();
            CreateMap<HistorySafetyDocDto, HistoryOfSafetyDocumentStateChange>();

            CreateMap<CallDto, Call>();
            CreateMap<Call, CallDto>();

            CreateMap<Resolution, ResolutionDto>();
            CreateMap<ResolutionDto, Resolution>();
            
            CreateMap<Customer, ConsumerDto>().ReverseMap();
            CreateMap<CreateConsumerDto, Customer>().ReverseMap();
        }
    }
}