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
            CreateMap<CreateDeviceDto, Device>();
            CreateMap<DeviceUpdateDto, Device>();
            CreateMap<Device, DeviceDto>();
            CreateMap<Customer, ConsumerDto>().ReverseMap();
            CreateMap<CreateConsumerDto, Customer>().ReverseMap();
        }
    }
}