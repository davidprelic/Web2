using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Entities;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class DeviceRepository : IDeviceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DeviceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public void AddDevice(Device device)
        {
            int counter = 0;

            switch (device.Type)
            {
                case "powerSwitch":
                    counter = _context.Devices
                    .Where(x => x.Type == "powerSwitch")
                    .Count();
                    device.Name = String.Format("{0}{1}", "SWI", counter+1);
                    break;
                case "fuse":
                    counter = _context.Devices
                    .Where(x => x.Type == "fuse")
                    .Count();
                    device.Name = String.Format("{0}{1}", "FUS", counter+1);
                    break;
                case "transformer":
                    counter = _context.Devices
                    .Where(x => x.Type == "transformer")
                    .Count();
                    device.Name = String.Format("{0}{1}", "TRA", counter+1);
                    break;
                case "disconnector":
                    counter = _context.Devices
                    .Where(x => x.Type == "disconnector")
                    .Count();
                    device.Name = String.Format("{0}{1}", "DIS", counter+1);
                    break;
            }
            
            _context.Devices.Add(device);
        }

        public void DeleteDevice(Device device)
        {
            _context.Devices.Remove(device);
        }

        public async Task<Device> GetDeviceByIdAsync(int id)
        {
            return await _context.Devices.FindAsync(id);
        }

        public async Task<IEnumerable<Device>> GetDevicesAsync()
        {
            return await _context.Devices.ToListAsync();
        }

        public async Task<IEnumerable<Device>> GetDevicesByIncidentIdAsync(int id)
        {
            return await _context.Devices
                .Where(x => x.IncidentId == id)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Device device)
        {
            _context.Entry(device).State = EntityState.Modified;
        }
    }
}