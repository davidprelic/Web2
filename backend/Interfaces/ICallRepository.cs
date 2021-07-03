using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface ICallRepository
    {
        void AddCall(Call call);
        void DeleteCall(Call call);
        void Update(Call call);
        Task<bool> SaveAllAsync();
        Task<Call> GetCallByIdAsync(int id);
        Task<IEnumerable<Call>> GetCallsByIncidentIdAsync(int id);
    }
}