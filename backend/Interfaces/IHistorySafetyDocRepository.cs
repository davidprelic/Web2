using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Interfaces
{
    public interface IHistorySafetyDocRepository
    {
        void AddHistorySafetyDoc(HistoryOfSafetyDocumentStateChange historySafetyDoc);
        void DeleteHistorySafetyDoc(HistoryOfSafetyDocumentStateChange historySafetyDoc);
        void Update(HistoryOfSafetyDocumentStateChange historySafetyDoc);
        Task<bool> SaveAllAsync();
        Task<HistoryOfSafetyDocumentStateChange> GetHistorySafetyDocByIdAsync(int id);
        Task<IEnumerable<HistoryOfSafetyDocumentStateChange>> GetHistorySafetyDocsBySafetyDocIdAsync(int id);
    }
}