using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IResolutionRepository
    {
        void AddResolution(Resolution resolution);
        void DeleteResolution(Resolution resolution);
        void Update(Resolution resolution);
        Task<bool> SaveAllAsync();
        Task<Resolution> GetResolutionByIdAsync(int? id);
    }
}