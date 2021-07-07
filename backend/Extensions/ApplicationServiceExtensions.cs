using backend.Data;
using backend.Interfaces;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using backend.Helpers;
using backend.Data.Repo;

namespace backend.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<IDeviceRepository, DeviceRepository>();
            services.AddScoped<ICallRepository, CallRepository>();
            services.AddScoped<IIncidentRepository, IncidentRepository>();
            services.AddScoped<ISafetyDocRepository, SafetyDocRepository>();
            services.AddScoped<IChecklistRepository, ChecklistRepository>();
            services.AddScoped<IHistorySafetyDocRepository, HistorySafetyDocRepository>();
            services.AddScoped<IResolutionRepository, ResolutionRepository>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}