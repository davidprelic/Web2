using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface ISafetyDocRepository
    {
        void AddSafetyDoc(SafetyDocument safetyDoc);
        void DeleteSafetyDoc(SafetyDocument safetyDoc);
        void Update(SafetyDocument safetyDoc);
        Task<bool> SaveAllAsync();
        Task<SafetyDocument> GetSafetyDocByIdAsync(int id);

        // Task<IEnumerable<SafetyDocument>> GetActiveSafetyDocsAsync();

        Task<IEnumerable<SafetyDocument>> GetSafetyDocsByUserIdAsync(int id);
        Task<IEnumerable<SafetyDocument>> GetSafetyDocsAsync();
    }
}