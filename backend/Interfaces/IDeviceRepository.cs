using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IDeviceRepository
    {
        void AddDevice(Device device);
        void DeleteDevice(Device device);
        void Update(Device device);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Device>> GetDevicesAsync();
        Task<Device> GetDeviceByIdAsync(int id);
        Task<IEnumerable<Device>> GetDevicesByIncidentIdAsync(int id);
    }
}